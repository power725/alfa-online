import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Loader,
  Screen,
  Text,
  Touchable,
  WizardSteps
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './booking-pickup-address-screen.style';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
import I18n from '@locales';
import Analytics from '../../../helpers/analytics';
import { Format, Notification, pushScreen as pushScreenCreator } from '@helpers';
import moment from 'moment';
import _ from 'lodash';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
const pushScreen = pushScreenCreator();
import * as Progress from 'react-native-progress';

class BookingPickupAddressScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Pickup Address Selection');

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    if (Platform.OS == 'android')
      this.requestPermission();
    else
      this._getClosestAddresses();
  }

  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': I18n.t('permissions.locationPermissionTitle'),
          'message': I18n.t('permissions.locationPermissionMessage')
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._getClosestAddresses();
      } else {
      }
    } catch (err) {
     
    }
  }

  _getClosestAddresses = () => {
    Geolocation.getCurrentPosition((position) => {
        const  geolocation = {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude
        }

        this.props.getClosestAddresses(geolocation)
          .then(response => {
            this.setState({ isLoading: false });
          })
          .catch(error => {
            this.setState({ isLoading: false });
          });
      }, (error) => {
        this.setState({ isLoading: false });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  _searchAddress = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'addressSearchScreen',
        animationType: 'slide-horizontal',
        passProps: {
          title: I18n.t('bookingWizard.pickupAddress.title'),
          onSelectAddress: (address) => {
            this.props.updateBookingWizard({
              pickupAddress: address
            });
          }
        }
      }
    });
  }

  _navigateToPreviousScreen = () => {
    const { commandType, navigator } = this.props;

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _continue = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'bookingDropAddressScreen'
      }
    });
  }

  render() {
    const {
      isLoading
    } = this.state;
    const {
      customerAddresses,
      prevUsedAddresses,
      nearbyAddresses,
      pickupAddress,
    } = this.props;
    const addresses = [
      ..._.map(prevUsedAddresses, (add) => ({...add, prevUsedAddress: true}) ),
      ..._.map(nearbyAddresses, (add) => ({...add, nearbyAddress: true}) ),
      ..._.map(customerAddresses, (add) => ({...add, favouriteAddress: true}) )
    ];

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('bookingWizard.header.title')}</Text>
        </View>

        <WizardSteps step={2}/>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../../assets/icons/pickup-address.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.pickupAddress.title')}</Text>
            </View>
            {
              pickupAddress && !addresses.includes(pickupAddress) ? (
                <Touchable onPress={() => this.props.updateBookingWizard({ pickupAddress : undefined})}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text numberOfLines={1} style={[styles.flex1, styles.sectionText]}>{Format.getFullAddressString(pickupAddress)}</Text>

                      <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.pickupAddress.changeAddress')}</Text>
                  </View>
                </Touchable>
              ) : (
                <View>
                  {
                    addresses.map((customerAddress, index) => {
                      var addressTitle = "";
                      var addressDetails = "";
                      if (customerAddress.Address)
                      {
                        // Quick/customer address!
                        addressTitle = customerAddress.Name;
                        addressDetails = Format.getFullAddressString(customerAddress.Address);
                      }
                      else
                      {
                        if (customerAddress.Name)
                        {
                          addressTitle = customerAddress.Name;
                          addressDetails = Format.getStreetName(customerAddress);
                        }
                        else
                        {
                          addressTitle = Format.getFullAddressString(customerAddress);
                        }
                      }
                      return (
                        <Touchable key={index}
                          disabled={pickupAddress && (pickupAddress.Id === customerAddress.Id)}
                          onPress={() => this.props.updateBookingWizard({ pickupAddress: customerAddress })}>
                          <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                            <View style={styles.flex1}>
                              <Text numberOfLines={1} style={[styles.sectionText]}>{addressTitle}</Text>
                              {
                                addressDetails ? (
                                  <View>
                                    <View style={{height: 8}}/>
                                    <Text numberOfLines={1} style={[styles.sectionTextSmall]}>{addressDetails}</Text>
                                  </View>
                                ) : null
                              }
                            </View>
                            {

                              customerAddress.prevUsedAddress ? (
                                <View style={styles.margin15}>
                                  <Image source={require('../../../assets/icons/address-recent.png')}/>
                                </View>
                              ) : null
                            }

                            {

                              customerAddress.nearbyAddress ? (
                                <View style={styles.margin15}>
                                  <Image source={require('../../../assets/icons/address-nearby.png')}/>
                                </View>
                              ) : null
                            }

                            {

                              customerAddress.favouriteAddress ? (
                                <View style={styles.margin15}>
                                  <Image source={require('../../../assets/icons/address-favourite.png')}/>
                                </View>
                              ) : null
                            }

                            {
                              pickupAddress && (pickupAddress.Id === customerAddress.Id) ? (
                                <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                              ) : (
                                <Image source={require('../../../assets/icons/radio-button.png')}/>
                              )
                            }
                          </View>
                        </Touchable>
                      );
                    })
                  }
                  <Touchable onPress={() => this._searchAddress('pickup')}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t('placeholder.otherAddress')}</Text>
                      {
                        (
                          <Image source={require('../../../assets/icons/radio-button.png')}/>
                        )
                      }
                    </View>
                  </Touchable>
                  {
                    isLoading ? (
                      <View style={[styles.section, styles.spaceBetween]}>
                        <View style={styles.loadingSection}>
                          <Progress.Circle
                            size={30}
                            color={COLOR.ACTIVITY_INDICATOR}
                            indeterminate={true} />
                        </View>
                        <Text numberOfLines={1} style={[styles.textSmall]}>{I18n.t('placeholder.loadingAddresses')}</Text>
                      </View>
                    ) : null
                  }
                </View>
              )
            }
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
              title={I18n.t('button.back')}
              onPress={this._navigateToPreviousScreen}/>
          </View>

          <View style={styles.buttonSpace}/>

          <View style={styles.buttonContainer}>
            <Button
              disabled={!pickupAddress}
              onPress={this._continue}
              title={I18n.t('button.continue')}/>
          </View>

        </LinearGradient>
      </Screen>
    );
  }
}

export default BookingPickupAddressScreen;
