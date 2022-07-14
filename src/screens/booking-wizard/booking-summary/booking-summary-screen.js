import React, {Component} from 'react';
import {BackHandler, Image, ScrollView, View} from 'react-native';
import {
  Button,
  BorderButton,
  Loader,
  Route,
  Screen,
  Text,
  Touchable,
} from '@components';
import {Navigation} from 'react-native-navigation';
import styles from './booking-summary-screen.style';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '@constants';
import {
  Format,
  pushScreen as pushScreenCreator,
  resetScreen as resetScreenCreator,
} from '@helpers';
import Analytics from '../../../helpers/analytics';
import * as Progress from 'react-native-progress';
import I18n from '@locales';
import _ from 'lodash';
import moment from 'moment';
import BookingAlternativeScreen from '../booking-alternative';
const resetScreen = resetScreenCreator();

class BookingSummaryScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  state = {
    Booking: null,
    alternativeLateTime: null,
    alternativeEarlyTime: null,
    isLoading: true,
    bookingConfirmationLoading: false,
    loadingText: '',
    warnings: []
  }

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Review');
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);

    this._getBookingSolution(this.props);
  }

  componentDidAppear() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidDisappear() {
    if (this.backHandler)
      this.backHandler.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bookingWizard !== nextProps.bookingWizard && nextProps.bookingWizard.findBooking) {
      this.setState({
        Booking: null,
        isLoading: true
      });
      this.props.updateBookingWizard({
        editMode: false,
        findBooking: false
      });
      this._getBookingSolution(nextProps);
    }
  }

  handleBackPress = () => {
    if (this.props.navigateBack) {
      this._navigateToPreviousScreen();
      return true;
    }
    else {
      resetScreen(this.props.componentId, [
        {
          component: {
            name: 'dashboardScreen'
          }
        }]
      );

      return true;
    }
  }

  _getBookingSolution = (props) => {
    const bookingRequestParams = this._getBookingRequestParams(props);
    const { bookingWizard: { editMode } } = this.props;

    props.getBookingSolution(bookingRequestParams)
      .then(response => {
        if (editMode === true)
          this.props.updateBookingWizard({ editMode: false });

        this.setState({
          isLoading: false,
          Booking: response.data.OriginalSuggestion,
          alternativeLateTime: response.data.NextTimeSuggestion,
          alternativeEarlyTime: response.data.PrevTimeSuggestion,
          warnings: response.data.Warnings
        });
      })
      .catch(error => {
        if (editMode === true)
          this.props.updateBookingWizard({ editMode: false });

        if (error.response && error.response.data && error.response.data.ResponseStatus) {
          let title = I18n.t('error.modalTitle');
          if (error.response.status === 409) {
            title = I18n.t('error.conflictTitle');
          }

          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              passProps: {
                title: title,
                message: error.response.data.ResponseStatus.Message,
                onConfirm: componentId => {
                  Navigation.dismissOverlay(componentId);
                  Navigation.pop(this.props.componentId);
                }
              }
            }
          });
        }
        else {
          Navigation.pop(this.props.componentId);
        }
      });
  }

  _getBookingRequestParams = (props) => {
    const {
      legitimation,
      timeWanted,
      timeType,
      pickupAddress,
      dropAddress,
      seatingType,
      assistancePickup,
      assistanceDrop,
      coTravellers,
      equipment,
    } = props.bookingWizard;
    const coTravellersParams = {}, luggageParams = {};

    if (coTravellers) {
      coTravellers.forEach((value, key) => {
        if (value > 0)
          coTravellersParams[key] = value;
      })
    }

    if (equipment) {
      equipment.forEach((value, key) => {
        if (value > 0)
          luggageParams[key] = value;
      })
    }

    const bookingRequestParams = {
      TimeType: timeType,
      LegId: legitimation ? legitimation.LegitimationId : null,
      RoutineId: legitimation ? legitimation.Routine.RoutineId : null,
      AddressFrom: pickupAddress ? (pickupAddress.Address ? pickupAddress.Address.Id : pickupAddress.Id) : null,
      AddressTo: dropAddress ? (dropAddress.Address ? dropAddress.Address.Id : dropAddress.Id) : null,
      TicketType: 'Single',
      SeatingType: seatingType ? seatingType.Id : 0,
      AssistancePickup: assistancePickup ? assistancePickup.Id : 0,
      AssistanceDrop: assistanceDrop ? assistanceDrop.Id : 0,
    };

    if (timeWanted)
      bookingRequestParams['TimeWanted'] = timeWanted;

    if (coTravellers)
      bookingRequestParams['CoTravellers'] = coTravellersParams;

    if (equipment)
      bookingRequestParams['Equipment'] = luggageParams;

    return bookingRequestParams;
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _continue = () => {
    const {Booking} = this.state;
    const bookingRequestParams = this._getBookingRequestParams(this.props);
    const params = {
      BookingId: Booking.Id,
    };
    this.setState({bookingConfirmationLoading: true});

    this.props
      .confirmBooking(params)
      .then(response => {
        this.setState({bookingConfirmationLoading: false});
        resetScreen(this.props.componentId, [
          {
            component: {
              name: 'bookingConfirmationScreen',
              passProps: {
                Booking: response.data.Booking,
                bookingRequestParams,
              },
            },
          },
        ]);
      })
      .catch(error => {
        this.setState({bookingConfirmationLoading: false});
        let title = I18n.t('error.modalTitle');
        if (error.response.status === 409) {
          title = I18n.t('error.conflictTitle') + '!';
        }

        let message = I18n.t('error.confirmBooking') + '!';

        if (error.response && error.response.data) {
          message = error.response.data.ResponseStatus.Message;
        }

        Navigation.showOverlay({
          component: {
            name: 'alertModal',
            passProps: {
              title: title,
              message: message,
              onConfirm: componentId => Navigation.dismissOverlay(componentId),
            },
          },
        });
      });
  };

  _selectAlternative = alternativeTime => {
    const {bookingWizard} = this.props;

    const alternativeBookingWizard = {
      ...bookingWizard,
      timeWanted: alternativeTime,
      findBooking: true,
    };

    this.props.updateBookingWizard(alternativeBookingWizard);
  };

  _cancelBooking = () => {
    resetScreen(this.props.componentId, [
      {
        component: {
          name: 'dashboardScreen',
        },
      },
    ]);
    this.props.resetBookingWizard();
  };

  _editDateTime = () => {
    this.props.updateBookingWizard({editMode: true});
    Navigation.showModal({
      component: {
        name: 'bookingWizardScreen',
        passProps: {
          editMode: true,
          onEditComplete: () => {
            this.props.updateBookingWizard({
              editMode: false,
              findBooking: true,
            });
          },
        },
      },
    });
  };

  _editOptionals = () => {
    this.props.updateBookingWizard({editMode: true});
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'bookingOptionalsScreen',
              passProps: {
                editMode: true,
                onEditComplete: () => {
                  this.props.updateBookingWizard({
                    editMode: false,
                    findBooking: true,
                  });
                },
              },
            },
          },
        ],
      },
    });
  };

  _editAddress = () => {
    this.props.updateBookingWizard({editMode: true});
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'bookingPickupAddressScreen',
              passProps: {
                editMode: true,
                onEditComplete: () => {
                  this.props.updateBookingWizard({
                    editMode: false,
                    findBooking: true,
                  });
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    const {
      Booking,
      bookingConfirmationLoading,
      alternativeEarlyTime,
      alternativeLateTime,
      isLoading,
      loadingText,
      warnings,
    } = this.state;
    const {
      navigator,
      bookingWizard: {
        legitimation,
        assistancePickup,
        assistanceDrop,
        coTravellers,
        equipment,
      },
    } = this.props;

    if (!legitimation) {
      return null;
    }

    const {AllowedCoTravellers, AllowedEquipment} = legitimation;
    const bookingRequestParams = this._getBookingRequestParams(this.props);
    let coTravellersText = '',
      luggageText = '';

    if (coTravellers) {
      coTravellersText = _.join(
        _.compact(
          _.map(AllowedCoTravellers, coTraveller => {
            return coTravellers.get(coTraveller.Key.Id)
              ? coTravellers.get(coTraveller.Key.Id) +
                  ' ' +
                  coTraveller.Key.Name
              : null;
          }),
        ),
        ', ',
      );
    }

    if (equipment)
      luggageText = _.join(_.compact(_.map(AllowedEquipment, equipmentItem => {
        return equipment.get(equipmentItem.Key.Id) ? (equipment.get(equipmentItem.Key.Id) + ' ' + equipmentItem.Key.Name) : null;
      })), ', ');

    if (isLoading) {
      return (
        <Screen>
          <View style={styles.loadingContainer}>
            <Text style={styles.sectionTitle}>{loadingText || (I18n.t('bookingWizard.summary.findingBooking') + '...')}</Text>
            <Progress.Circle
              size={100}
              color={COLOR.ACTIVITY_INDICATOR}
              indeterminate={true} />
          </View>
        </Screen>
      )
    }

    if (!Booking) {
      return (
        <BookingAlternativeScreen
          navigator={navigator}
          onPressClose={this._navigateToPreviousScreen}
          onPressAlternative={this._selectAlternative}
          onPressCancelBooking={this._cancelBooking}
          onPressEditDateTime={this._editDateTime}
          originalBooking={bookingRequestParams}
          alternativeLateTime={alternativeLateTime}
          alternativeEarlyTime={alternativeEarlyTime} />
      );
    }

    const job = Booking.Jobs[0];
    const { Booking: { ServiceFee, PickupTimeInfo, SeatingType } } = this.state;
    let timeType;
    switch(bookingRequestParams.TimeType) {
      case 'ArrivalLatest':
        timeType = I18n.t('bookingWizard.dateTime.arrivalLatest');
        break;

      case 'DepartureAround':
        timeType = I18n.t('bookingWizard.dateTime.departureAround');
        break;

      case 'DepartureEarliest':
        timeType = I18n.t('bookingWizard.dateTime.departureEarliest');
        break;
    }

    return (
      <Screen>
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContentContainer}>
          <View>
            <View style={[styles.sectionTop, styles.row]}>
              <Image
                source={require('../../../assets/icons/section-summary.png')}
              />
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.summary.title')}</Text>
            </View>

            <Touchable onPress={this._editDateTime}>
              <View style={[styles.section, styles.row]}>
                <View>
                  <Text style={styles.sectionText}>{ Format.date(bookingRequestParams.TimeWanted, 'dddd, DD MMMM')}</Text>
                  <Text style={[styles.secondLineText, styles.sectionText]}>{timeType + ' ' + Format.date(bookingRequestParams.TimeWanted, 'HH:mm')}</Text>
                </View>
              </View>
            </Touchable>
            <Touchable onPress={this._editAddress}>
              <View style={[styles.section, styles.row]}>
                <Route
                  route={job.Nodes.map((node) => ({
                    formattedAddress: Format.getFullAddressString(node.Address),
                  }))} />
              </View>
            </Touchable>
            <Touchable onPress={this._editOptionals}>
              <View style={[styles.section, styles.row]}>
                <View>
                  <Text style={styles.sectionText}>{I18n.t('bookingWizard.seatingType.title')}: {SeatingType.Name}</Text>
                  {
                    assistancePickup ? (
                      <Text style={[styles.sectionTextSmall]}>{I18n.t('bookingWizard.driverPickupAssistance.title')}: {assistancePickup.Name}</Text>
                    ) : null
                  }

                  {
                    assistanceDrop ? (
                      <Text style={[styles.sectionTextSmall]}>{I18n.t('bookingWizard.driverDropAssistance.title')}: {assistanceDrop.Name}</Text>
                    ) : null
                  }

                  {
                    coTravellers && coTravellersText ? (
                      <Text style={[styles.sectionTextSmall]}>{I18n.t('bookingWizard.coTravellers.title')}: {coTravellersText}</Text>
                    ) : null
                  }

                  {
                    equipment && luggageText ? (
                      <Text style={[styles.sectionTextSmall]}>{I18n.t('bookingWizard.luggageType.title')}: {luggageText}</Text>
                    ) : null
                  }
                </View>
              </View>
            </Touchable>
          </View>

          <View style={styles.noteContainer}>
            <Image style={styles.noteIcon} source={require('../../../assets/icons/picker-up.png')}/>
            <Text style={styles.noteText}>{I18n.t('bookingWizard.summary.confirmationNote')}</Text>
            <Image style={styles.noteIcon} source={require('../../../assets/icons/picker-up.png')}/>
          </View>

          <View style={styles.space10}/>

          <View>
            <View style={[styles.sectionTop, styles.sectionResult, styles.row]}>
              <Image source={require('../../../assets/icons/section-result.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.result.title')}</Text>
            </View>


            <View style={styles.section}>
              <View style={[styles.row, styles.spaceBetween]}>
                <View>
                  <Text style={styles.sectionText}>{I18n.t('bookingWizard.summary.expectedPickupTime')}{': '}</Text>
                </View>
                <View>
                  <Text style={styles.sectionTextLarge}>{Format.date(PickupTimeInfo.TimeNegotiated, 'HH:mm')}</Text>
                </View>
              </View>

              {
                PickupTimeInfo.TimeFlexEnd || warnings.length > 0 ? (
                  <View style={styles.separator}/>
                ) : null
              }

              {

                PickupTimeInfo.TimeFlexEnd && moment().isBefore(PickupTimeInfo.TimeFlexEnd) ? (
                  <View style={styles.infoRow}>
                    <Image style={styles.infoIcon} source={require('../../../assets/icons/info-small.png')}/>
                    <View style={styles.flex1}>
                      <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.summary.flexibleTime')} {` ${Format.time(PickupTimeInfo.TimeFlexEnd)}`}</Text>
                    </View>
                  </View>
                ) : null
              }

              {
                warnings.length > 0 ? (
                  <View style={{height: 8}}/>
                ) : null
              }

              {
                _.map(warnings, (warning, index, list) => (
                  <View key={index}>
                    <View style={styles.infoRow}>
                      <Image style={styles.infoIcon} source={require('../../../assets/icons/warning-note.png')}/>
                      <View style={styles.flex1}>
                        <Text style={styles.textWarning}>{warning}</Text>
                      </View>
                    </View>
                    {
                      index < (list.length - 1) && (
                        <View style={{height: 8}}/>
                      )
                    }
                  </View>
                ))
              }
            </View>

            <View style={styles.section}>
              <View style={[styles.row, styles.spaceBetween]}>
                <View>
                  <Text style={styles.sectionText}>{I18n.t('placeholder.cost')}{': '}</Text>
                  <Text style={styles.sectionTextSmall}>{ServiceFee.IsInvoiced ? I18n.t('placeholder.invoiced') : I18n.t('placeholder.notInvoiced')}</Text>
                </View>
                <View>
                  <Text style={styles.sectionTextLarge}>{ServiceFee.Fee} {ServiceFee.CurrencyShort}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <LinearGradient
          colors={COLOR.TAB_GRADIENT}
          start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1}}
          locations={[0, 0.2]}
          style={styles.tabBar}>
          <View style={styles.buttonContainer}>
            <BorderButton
              textStyle={styles.backButtonText}
              title={I18n.t('button.abort')}
              onPress={this._cancelBooking}/>
          </View>

          <View style={styles.buttonSpace}/>

          <View style={styles.buttonContainerLarge}>
            <Button
              disabled={!Booking}
              onPress={this._continue}
              title={I18n.t('button.confirmBooking')}/>
          </View>
        </LinearGradient>
        <Loader visible={bookingConfirmationLoading}/>
      </Screen>
    );
  }
}

export default BookingSummaryScreen;
