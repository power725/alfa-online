import React, { Component } from 'react';
import {
  BackHandler,
  Image,
  View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  BorderButton,
  Button,
  Loader,
  Screen,
  Text,
  Touchable
} from '@components';
import styles from './booking-confirmation-screen.style';
import ViewOverflow from 'react-native-view-overflow';
import I18n from '@locales';
import moment from 'moment';
import Analytics from '../../../helpers/analytics';
import {
  Format,
  resetScreen as resetScreenCreator,
  pushScreen as pushScreenCreator,
  getBookingParams
} from '@helpers';
const resetScreen = resetScreenCreator();
const pushScreen = pushScreenCreator();

class BookingConfirmationScreen extends Component {
  static options() {
    return {
      modalPresentationStyle: 'overCurrentContext',
      layout: {
        backgroundColor: 'transparent'
      },
      animations: {
        dismissModal: {
          enabled: 'false'
        },
        showModal: {
          enabled: 'false'
        }
      }
    }
  }

  state = {
    isLoading: false
  }

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Booking Confirmed');
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidDisappear() {
    if (this.backHandler) this.backHandler.remove();
  }

  handleBackPress = () => {
    resetScreen(this.props.componentId, [
      {
        component: {
          name: 'dashboardScreen'
        }
      }]
    );

    return true;
  }

  _navigateToPreviousScreen = () => {
    resetScreen(this.props.componentId, [
      {
        component: {
          name: 'dashboardScreen'
        }
      }]
    );
  }

  _bookingReturn = () => {
    const { bookingWizard, navigator } = this.props;
    const returnBookingWizard = {
      ...bookingWizard,
      timeWanted: moment(bookingWizard.timeWanted).isSameOrAfter(moment(), 'day') ? bookingWizard.timeWanted: null,
      timeType: null,
      pickupAddress: bookingWizard.dropAddress,
      dropAddress: bookingWizard.pickupAddress,
      assistancePickup: bookingWizard.assistanceDrop,
      assistanceDrop: bookingWizard.assistancePickup,
      isReturn: true,
      pickupTimeInfo:bookingWizard.pickupTimeInfo || this.props.Booking.PickupTimeInfo
    };

    this.props.updateBookingWizard(returnBookingWizard);
    pushScreen(this.props.componentId, {
      component:{
        name: 'bookingWizardScreen',
        passProps: {
          editMode: true,
          onEditComplete: componentId => {
            this.props.updateBookingWizard({ editMode: false, findBooking: true });
            pushScreen(componentId, {
              component: {
                name: 'bookingSummaryScreen',
              }
            });
          },
        }
      }
    });
  }

  _bookAnother = () => {
    const { bookingWizard } = this.props;
    const newBookingWizard = {
      ...bookingWizard,
      timeWanted: null,
      timeType: null,
      isReturn: false
    };

    this.props.updateBookingWizard(newBookingWizard);
    pushScreen(this.props.componentId, {
      component: {
        name: 'bookingWizardScreen',
        passProps: {
          editMode: true,
          onEditComplete: componentId => {
            this.props.updateBookingWizard({ editMode: false, findBooking: true });
            pushScreen(componentId, {
              component: {
                name: 'bookingSummaryScreen',
              }
            });
          },
        }
      }
    });
  }

  _exitBookingWizard = () => {
    resetScreen(this.props.componentId, [
      {
        component: {
          name: 'dashboardScreen'
        }
      }]
    );
  }

  render() {
    const { Booking, bookingRequestParams,bookingWizard, bookingWizard: { isReturn } } = this.props;

    const { isLoading } = this.state;
    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../../assets/icons/success-modal.png')}/>
            </ViewOverflow>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                onPress={this._navigateToPreviousScreen}
                style={styles.closeButton}>
                <Image source={require('../../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <Text style={styles.title}>{I18n.t(`bookingWizard.confirmation.title`)}</Text>
            <Text style={styles.text}>{I18n.t(`bookingWizard.confirmation.bookingAt`)} {Format.date(Booking.PickupTimeInfo.TimeNegotiated, 'dddd, DD MMMM [kl] HH:mm')} {I18n.t(`bookingWizard.confirmation.isNowConfirmed`)}</Text>
            <View style={{height: 15}}/>

            {
              Booking.PickupTimeInfo.TimeFlexEnd && moment().isBefore(Booking.PickupTimeInfo.TimeFlexEnd) ? (
                <Text style={styles.text}>{I18n.t(`bookingWizard.summary.flexibleTime`)} {Format.date(Booking.PickupTimeInfo.TimeFlexEnd, 'dddd, DD MMMM [kl] HH:mm')} </Text>
              ) : null
            }

            <View style={{height: 20}}/>

            <View style={{paddingHorizontal: 35}}>
              {
                isReturn ? null : (
                  <View>
                    <Button
                      onPress={this._bookingReturn}
                      title={I18n.t(`button.bookReturnTrip`)}/>
                    <View style={{height: 10}}/>
                  </View>
                )
              }

              <Button
                onPress={this._bookAnother}
                title={I18n.t(`button.bookSameTrip`)}/>
              <View style={{height: 35}}/>
              <BorderButton
                onPress={this._exitBookingWizard}
                title={I18n.t(`button.returnToDashboard`)}/>
            </View>
          </View>
        </View>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default BookingConfirmationScreen;
