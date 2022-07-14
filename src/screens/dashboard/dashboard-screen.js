import React, {Component} from 'react';
import {
  AppState,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import {
  Loader,
  Pagination,
  ScheduleList,
  Screen,
  Text,
  Touchable,
} from '@components';
import styles from './dashboard-screen.style';
import LinearGradient from 'react-native-linear-gradient';
import NoJobCard from './no-job-card';
import JobCard from './job-card';
import RetryCard from './retry-card';
import {checkCustomerSession, getNextJob} from '@web-services';
import * as Progress from 'react-native-progress';
import Placeholder from 'rn-placeholder';
import I18n from '@locales';
import {COLOR} from '@constants';
import {pushScreen as pushScreenCreator} from '@helpers';
import Analytics from '../../helpers/analytics';

import _ from 'lodash';
import moment from 'moment';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
import OneSignal from 'react-native-onesignal';
import {Navigation} from 'react-native-navigation';
const pushScreen = pushScreenCreator();

class DashboardScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#434859',
    orientation: 'portrait',
  };

  constructor(props) {
    super(props);

    Analytics.track('Dashboard');

    this.state = {
      currentItem: 0,
      interactionsComplete: true,
      nextJob: null,
      dateBookings: this._getDefaultCalendar(),
      nextJobLoading: true,
      isRefreshing: false,
      availableCustomers: [],
      fetchingActiveProfile: true,
      fetchingBookings: true,
      requestTimedOut: false,
    };
  }

  _getDefaultCalendar = () => {
    var startDate = moment()
      .startOf('day')
      .subtract(7, 'days');
    var lastDate = moment()
      .startOf('day')
      .add(14, 'days');
    var dateBookings = [];

    while (startDate.isBefore(lastDate)) {
      var dateBooking = [];

      startDate.add(1, 'day');
      dateBooking.push({
        date: startDate.toISOString(),
        bookings: Array(2),
      });

      if (!startDate.isSame(lastDate)) {
        startDate.add(1, 'day');
        dateBooking.push({
          date: startDate.toISOString(),
          bookings: Array(2),
        });
      }

      dateBookings.push(dateBooking);
    }

    return dateBookings;
  };

  componentDidMount() {
    this.props.resetBookingWizard();

    setTimeout(
      () => {
        if(this.calendar){
          this.calendar.scrollToOffset({offset: 330 * 3, animated: false});
        }
      },
      Platform.OS === 'android' ? 200 : 0,
    );

    this._fetchData();

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        const { notification } = notificationReceivedEvent;
        this._onNotification(notification)
        notificationReceivedEvent.complete();
      }
    );

    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      const { notification } = openedEvent;
      this._onNotificationOpened(notification);
    });
  }

  componentWillUnmount() {
    OneSignal.clearHandlers();
  }

  componentWillReceiveProps(nextProps) {
    const groupedBookings = _.groupBy(nextProps.bookings, booking => {
      return moment(booking.Jobs[0].TimePickup)
        .startOf('day')
        .toISOString();
    });

    let maxItemsInADay = 2;

    let dateBookings = _.map(this.state.dateBookings, twoDateBookings => {
      return _.map(twoDateBookings, dateBooking => {
        const {date} = dateBooking;
        const availableBookings = groupedBookings[date] || [];
        maxItemsInADay =
          availableBookings.length > maxItemsInADay
            ? availableBookings.length
            : maxItemsInADay;

        return {
          date: date,
          bookings: availableBookings,
        };
      });
    });

    dateBookings = _.map(dateBookings, twoDateBookings => {
      return _.map(twoDateBookings, dateBooking => {
        var {bookings, date} = dateBooking;

        return {
          date: date,
          bookings: [
            ...bookings,
            ...(bookings.length < maxItemsInADay
              ? Array(maxItemsInADay - bookings.length)
              : []),
          ],
        };
      });
    });

    this.setState({
      dateBookings: dateBookings,
    });
  }

  _onNotificationOpened = notification => {

    this._onNotification(notification, true);
  };

  _onNotification = (notification, opened) => {
    const {
      notifications: {popupOpen, pushNotification},
      openPopup,
      updatePushNotification,
    } = this.props;
    const appState = AppState.currentState;

    if (
      !pushNotification ||
      pushNotification.notificationID !==
        notification.notificationId
    ) {
      updatePushNotification(notification);
    }

    if (!popupOpen && (opened || appState === 'active')) {
      openPopup(true);

      Navigation.showOverlay({
        component: {
          name: 'notificationAlertModal',
          passProps: {
            title: notification.title,
            message: notification.body,
            notification,
            onPressOk: componentId => {
              if (notification.additionalData) {
                let params = {
                  NotificationIds: [
                    '' +
                      notification.additionalData.actorNotificationId,
                  ],
                };

                this.props.markNotificationsRead(params).catch(error => {});
              }

              Navigation.dismissOverlay(componentId);
            },
            onPressOpenNotifications: componentId => {
              if (notification.additionalData) {
                let params = {
                  NotificationIds: [
                    '' +
                      notification.additionalData.actorNotificationId,
                  ],
                };

                this.props.markNotificationsRead(params).catch(error => {});
              }

              Navigation.dismissOverlay(componentId);

              setTimeout(() => {
                pushScreen(this.props.componentId, {
                  component: {
                    name: 'notificationsScreen',
                  },
                });
              }, 300);
            },
          },
        },
      });
    }
  };

  _fetchData = () => {
    const {authToken, logout, setUser} = this.props;

    this.setState({
      requestTimedOut: false,
      fetchingActiveProfile: true,
      fetchingBookings: true,
    });

    checkCustomerSession(authToken)
      .then(response => {
        if (response.data.AuthenticationState === 'NotAuthorized') {
          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              passProps: {
                title: I18n.t('error.sessionNotValid'),
                animationType: 'none',
                message: I18n.t('error.sessionExpired'),
                onConfirm: componentId => {
                  Navigation.dismissOverlay(componentId);
                  logout();
                },
              },
            },
          });
        } else {
          setUser(response.data.Customer);
          this.setState({
            interactionsComplete: true,
            isRefreshing: false,
          });
          this._getNextJob();
          this._getDashboardBookings();
          this._getCustomerSettings();
          this._getActiveProfile();
        }
      })
      .catch(error => {
        let requestTimedOut = false;

        if (error.code === 'ECONNABORTED') {
          requestTimedOut = true;
        }

        this.setState({
          interactionsComplete: true,
          isRefreshing: false,
          requestTimedOut,
          fetchingBookings: false,
          fetchingActiveProfile: false,
        });
      });
  };

  _onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
        nextJobLoading: true,
        fetchingActiveProfile: true,
      },
      this._fetchData,
    );
  };

  _getNextJob = () => {
    const {authToken} = this.props;

    getNextJob(authToken)
      .then(response => {
        this.setState({
          nextJob: response.data.Job,
          nextJobTimeRequested: response.data.RequestedTime,
          nextJobTimeType: response.data.TimeType,
          nextJobLoading: false,
        });
      })
      .catch(error => {
        this.setState({nextJobLoading: false});
      });
  };

  _getDashboardBookings = () => {
    this.setState({fetchingBookings: true});
    this.props
      .getBookings()
      .then(response => this.setState({fetchingBookings: false}))
      .catch(error => this.setState({fetchingBookings: false}));
  };

  _getActiveProfile = () => {
    const {getActiveProfile} = this.props;

    this.setState({fetchingActiveProfile: true});
    getActiveProfile()
      .then(response => {
        this.setState({fetchingActiveProfile: false});
        const {Customer: customer} = response.data;

        if (
          customer &&
          customer.LegitimationInfoStrings.length === 0 &&
          customer.CustomerSettings.AvailableCustomers.length === 0 &&
          !this.props.activeProfilePopupShown
        ) {
          this.props.showActiveProfilePopup();

          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              passProps: {
                title: I18n.t('dashboard.activeProfilePopupTitle'),
                message: I18n.t('dashboard.activeProfilePopup'),
                onConfirm: componentId =>
                  Navigation.dismissOverlay(componentId),
              },
            },
          });
        }
      })
      .catch(error => this.setState({fetchingActiveProfile: false}));
  };

  _getCustomerSettings = () => {
    const {getCustomerSettings} = this.props;

    getCustomerSettings()
      .then(response => {
        this.setState({
          availableCustomers: response.data.CustomerSettings.AvailableCustomers,
        });
      })
      .catch(error => {});
  };

  _selectCustomer = () => {
    const {availableCustomers} = this.state;
    const {currentUser} = this.props;

    Navigation.showModal({
      component: {
        name: 'selectCustomerScreen',
        passProps: {
          customers: [...availableCustomers, currentUser],
          onSelect: this._changeActiveProfile,
        },
      },
    });
  };

  _changeActiveProfile = customerId => {
    const {changeActiveProfile} = this.props;
    const {currentUser} = this.props;
    this.setState({isLoading: true, nextJobLoading: true});

    changeActiveProfile(currentUser.Id === customerId ? 0 : customerId)
      .then(response => {
        this.setState(
          {
            isLoading: false,
            dateBookings: this._getDefaultCalendar(),
            nextJob: null,
          },
          this._fetchData,
        );
      })
      .catch(error => {
        this.setState({isLoading: false});
      });
  };

  _onScroll = ({nativeEvent}) => {
    const currentItem = parseInt(
      (nativeEvent.contentOffset.x + 82.5) / (165 * 2),
      10,
    );

    this.paginationView.setNativeProps({currentItem});
    this._setCurrentItem(currentItem);
  };

  _setCurrentItem = _.debounce(currentItem => {
    if (currentItem !== this.state.currentItem) {
      this.setState({currentItem: currentItem});
    }
  }, 30);

  _openBookingDetails = (booking, job) => {
    const BookingId = booking ? booking.Id : this.state.nextJob.BookingId;
    Analytics.trackWithProperties('Open Booking Details', {
      bookingId: BookingId,
    });

    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'bookingDetailsScreen',
              passProps: {
                bookingId: BookingId,
                job: job,
                onCancelBooking: this._fetchData,
              },
            },
          },
        ],
      },
    });
  };

  _createBookingWithDate = date => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'bookingWizardScreen',
        passProps: {
          date,
        },
      },
    });
  };

  _navigateToBookingWizard = () => {
    Analytics.track('Start Booking Wizard');

    pushScreen(this.props.componentId, {
      component: {
        name: 'bookingWizardScreen',
      },
    });
  };

  _navigateToSettings = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'settingsScreen',
      },
    });
  };

  render() {
    const {activeProfile, currentUser} = this.props;

    const {
      dateBookings,
      interactionsComplete,
      nextJob,
      nextJobTimeRequested,
      nextJobLoading,
      fetchingActiveProfile,
      fetchingBookings,
      isLoading,
      requestTimedOut,
    } = this.state;

    if (!interactionsComplete) {
      return (
        <Screen>
          <View style={styles.loadingContainer}>
            <Progress.Circle
              size={100}
              color={COLOR.ACTIVITY_INDICATOR}
              indeterminate={true}
            />
          </View>
        </Screen>
      );
    }

    return (
      <Screen>
        <ScrollView
          nestedScrollEnabled
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              progressBackgroundColor={COLOR.CARD_BACKGROUND}
              tintColor={COLOR.CARD_BACKGROUND}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.topBarContainer}>
            <View style={styles.activeProfileContainer}>
              <View style={styles.topBar}>
                <Placeholder.Paragraph
                  animate="fade"
                  lineNumber={1}
                  lineSpacing={0}
                  onReady={!fetchingActiveProfile}>
                  {activeProfile ? (
                    <Text numberOfLines={1} style={styles.activeProfile}>
                      {I18n.t('button.activeProfile')}:{' '}
                      <Text style={styles.activeProfileBold}>
                        {activeProfile.Firstname + ' ' + activeProfile.Lastname}
                      </Text>
                    </Text>
                  ) : null}
                </Placeholder.Paragraph>
              </View>
            </View>

            {currentUser &&
            currentUser.CustomerSettings &&
            currentUser.CustomerSettings.AvailableCustomers.length > 0 ? (
              <Touchable
                style={styles.changeButtonContainer}
                onPress={this._selectCustomer}>
                <View style={[styles.topBar, styles.changeButton]}>
                  <Placeholder.Paragraph
                    animate="fade"
                    lineNumber={1}
                    lineSpacing={0}
                    onReady={!fetchingActiveProfile}>
                    <Text
                      style={[styles.activeProfile, styles.activeProfileBold]}>
                      {I18n.t('button.change')} (+
                      {
                        currentUser.CustomerSettings.AvailableCustomers.length
                      }{' '}
                      {currentUser.CustomerSettings.AvailableCustomers
                        .length === 1
                        ? I18n.t('dashboard.moreCustomer')
                        : I18n.t('dashboard.moreCustomers')}
                      )
                    </Text>
                  </Placeholder.Paragraph>
                </View>
              </Touchable>
            ) : null}
          </View>

          {requestTimedOut ? (
            <RetryCard onPressRetry={this._fetchData} />
          ) : !nextJob && !nextJobLoading ? (
            <NoJobCard />
          ) : (
            <JobCard
              onPress={() => this._openBookingDetails()}
              loading={nextJobLoading}
              timeRequested={nextJobTimeRequested}
              job={nextJob}
            />
          )}

          <View style={styles.bottomContainer}>
            <Pagination
              ref={paginationView => (this.paginationView = paginationView)}
              pages={dateBookings}
            />

            <FlatList
              ref={calendar => (this.calendar = calendar)}
              style={styles.listView}
              contentContainerStyle={{
                paddingHorizontal: (SCREEN_WIDTH - 20 - 330) / 2,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              onScroll={this._onScroll}
              scrollEventThrottle={10}
              snapToAlignment={Platform.OS === 'ios' ? 'start' : undefined}
              snapToInterval={Platform.OS === 'ios' ? 330 : undefined}
              decelerationRate={Platform.OS === 'ios' ? 0.1 : undefined}
              data={dateBookings}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item, index}) => (
                <ScheduleList
                  onPressAddBooking={date => this._createBookingWithDate(date)}
                  fetchingData={fetchingBookings}
                  dateBookings={item}
                  onPressItem={this._openBookingDetails}
                />
              )}
            />
          </View>
        </ScrollView>
        <LinearGradient
          colors={COLOR.TAB_GRADIENT}
          start={{
            x: 0.5,
            y: 0.0,
          }}
          end={{
            x: 0.5,
            y: 1,
          }}
          locations={[0, 0.5]}
          style={styles.tabBar}>
          <Touchable
            style={[styles.tab]}
            onPress={this._navigateToBookingWizard}>
            <View style={styles.button}>
              <Image source={require('../../assets/icons/addbook_ico.png')} />
              <Text style={styles.buttonText}>
                {I18n.t('button.newBooking')}
              </Text>
            </View>
          </Touchable>

          <View style={styles.buttonSpace} />

          <Touchable style={[styles.tab]} onPress={this._navigateToSettings}>
            <View style={styles.button}>
              <Image source={require('../../assets/icons/settings_ico.png')} />
              <Text style={styles.buttonText}>{I18n.t('button.settings')}</Text>
            </View>
          </Touchable>
        </LinearGradient>
        <Loader visible={isLoading} />
      </Screen>
    );
  }
}

export default DashboardScreen;
