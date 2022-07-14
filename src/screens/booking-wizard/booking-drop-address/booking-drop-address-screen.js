import React, { Component } from 'react';
import {
  Image,
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
import styles from './booking-drop-address-screen.style';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
import I18n from '@locales';
import { Format, pushScreen as pushScreenCreator } from '@helpers';
import Analytics from '../../../helpers/analytics';
import moment from 'moment';
import _ from 'lodash';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
const pushScreen = pushScreenCreator();

class BookingDropAddressScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Drop Address Selection');

    this.state = {
      isLoading: false
    };
  }

  _searchAddress = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'addressSearchScreen',
        passProps: {
          commandType: 'Push',
          title: I18n.t('bookingWizard.dropAddress.title'),
          onSelectAddress: (address) => {
            this.props.updateBookingWizard({
              dropAddress: address
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
    const { pickupAddress, dropAddress, timeWanted, editMode } = this.props;
    const AddressFrom = pickupAddress.Address ? pickupAddress.Address : pickupAddress;
    const AddressTo = dropAddress.Address ? dropAddress.Address : dropAddress;
    const params = {
      StartTimeWanted: timeWanted,
      AddressFrom: AddressFrom.Id,
      AddressTo: AddressTo.Id,
    };

    this.setState({ isLoading: true });

    this.props.getSuitableLegitimation(params)
      .then(response => {
        this.setState({ isLoading: false });
        const Legitimations = response.data.Legitimations;

        if (Legitimations.length === 0) {
          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              animationType: 'none',
              passProps: {
                title: I18n.t('error.modalTitle'),
                message: I18n.t('error.legitimationsNotFound'),
                onConfirm: componentId => Navigation.dismissOverlay(componentId)
              }
            }
          });
        }
        else if (Legitimations.length === 1) {
          this.props.updateBookingWizard({
            legitimation: Legitimations[0]
          });

          if (editMode) {
            this.props.updateBookingWizard({
              editMode: false,
              findBooking: true
            });
            Navigation.dismissAllModals();
          }
          else {
            pushScreen(this.props.componentId, {
              component: {
                name: 'bookingOptionalsScreen',
              }
            });
          }
        }
        else {
          pushScreen(this.props.componentId, {
            component: {
              name: 'legitimationsScreen',
              passProps: {
                Legitimations
              }
            }
          });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        if (error.response && error.response.data && error.response.data.ResponseStatus) {
          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              animationType: 'none',
              passProps: {
                title: error.response.status,
                message: error.response.data.ResponseStatus.Message,
                onConfirm: componentId => Navigation.dismissOverlay(componentId)
              }
            }
          });
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
      dropAddress,
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

        <WizardSteps step={3}/>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../../assets/icons/drop-address.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.dropAddress.title')}</Text>
            </View>
            {
              dropAddress && !addresses.includes(dropAddress) ? (
                <Touchable onPress={() => this.props.updateBookingWizard({ dropAddress : undefined})}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text numberOfLines={1} style={[styles.flex1, styles.sectionText]}>{Format.getFullAddressString(dropAddress)}</Text>
                      <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.dropAddress.changeAddress')}</Text>
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
                          disabled={dropAddress && (dropAddress.Id === customerAddress.Id)}
                          onPress={() => this.props.updateBookingWizard({ dropAddress: customerAddress })}>
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
                              dropAddress && (dropAddress.Id === customerAddress.Id) ? (
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
                  <Touchable onPress={() => this._searchAddress('drop')}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t('placeholder.otherAddress')}</Text>
                      {
                        (
                          <Image source={require('../../../assets/icons/radio-button.png')}/>
                        )
                      }
                    </View>
                  </Touchable>
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
              disabled={!dropAddress}
              onPress={this._continue}
              title={I18n.t('button.continue')}/>
          </View>

        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default BookingDropAddressScreen;
