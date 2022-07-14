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
import styles from './booking-optionals-screen.style';
import I18n from '@locales';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
import Analytics from '../../../helpers/analytics';
import {
  pushScreen as pushScreenCreator,
  resetScreen as resetScreenCreator
} from '@helpers';
import _ from 'lodash';
const pushScreen = pushScreenCreator();
const resetScreen = resetScreenCreator();

class BookingOptionalsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    isLoading: false
  };

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Option Selection');

    const { legitimation, seatingType } = props;
    const { AllowedSeatingTypes } = legitimation;
    const bookingWizard = { seatingType };

    if (AllowedSeatingTypes.length === 1)
      bookingWizard['seatingType'] = AllowedSeatingTypes[0];

    this.props.updateBookingWizard(bookingWizard);
  }

  _navigateToSeatingTypeScreen = () => {
    const { legitimation } = this.props;
    Analytics.track('Booking Wizard Seating Type Selection');

    pushScreen(this.props.componentId, {
      component: {
        name: 'seatingTypeScreen',
        animationType: 'slide-horizontal',
        passProps: {
          AllowedSeatingTypes: _.drop(legitimation.AllowedSeatingTypes, 3),
          onConfirm: (seatingType) => {
            this.props.updateBookingWizard({ seatingType: seatingType });
          }
        }
      }
    });
  }

  _navigateToDriverPickupAssistanceScreen = () => {
    const { legitimation } = this.props;
    Analytics.track('Booking Wizard Pickup Assistance Selection');

    pushScreen(this.props.componentId, {
      component: {
        name: 'driverAssistanceScreen',
        animationType: 'slide-horizontal',
        passProps: {
          AllowedAssistances: legitimation.AllowedAssistances,
          onConfirm: (pickupAssistance) => {
            this.props.updateBookingWizard({ assistancePickup: pickupAssistance });
          }
        }
      }
    });
  }

  _navigateToDriverDropAssistanceScreen = () => {
    const { legitimation } = this.props;
    Analytics.track('Booking Wizard Drop Assistance Selection');

    pushScreen(this.props.componentId, {
      component: {
        name: 'driverAssistanceScreen',
        animationType: 'slide-horizontal',
        passProps: {
          AllowedAssistances: legitimation.AllowedAssistances,
          onConfirm: (dropAssistance) => {
            this.props.updateBookingWizard({ assistanceDrop: dropAssistance });
          }
        }
      }
    });
  }

  _selectPickupAssistance = () => {
    const { legitimation } = this.props;
    const pickupAssistance = legitimation.AllowedAssistances[0];

    this.props.updateBookingWizard({ assistancePickup: pickupAssistance });
  }

  _selectDropAssistance = () => {
    const { legitimation } = this.props;
    const dropAssistance = legitimation.AllowedAssistances[0];

    this.props.updateBookingWizard({ assistanceDrop: dropAssistance });
  }

  _navigateToCoTravellersScreen = () => {
    const { legitimation } = this.props;
    Analytics.track('Booking Wizard Cotravellers Selection');

    pushScreen(this.props.componentId, {
      component: {
        name: 'coTravellersScreen',
        animationType: 'slide-horizontal',
        passProps: {
          AllowedCoTravellers: legitimation.AllowedCoTravellers,
          onConfirm: (coTravellers) => {
            this.props.updateBookingWizard({ coTravellers });
          }
        }
      }
    });
  }

  _navigateToLuggageTypeScreen = () => {
    const { legitimation } = this.props;
    Analytics.track('Booking Wizard Luggage Selection');

    pushScreen(this.props.componentId, {
      component: {
        name: 'luggageTypeScreen',
        animationType: 'slide-horizontal',
        passProps: {
          AllowedEquipment: legitimation.AllowedEquipment,
          onConfirm: (luggage) => {
            this.props.updateBookingWizard({ equipment: luggage });
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
    if (this.props.editMode) {
      this.props.onEditComplete && this.props.onEditComplete();
      this._navigateToPreviousScreen();
    }
    else {
      pushScreen(this.props.componentId, {
        component: {
          name: 'bookingSummaryScreen',
          animationType: 'slide-horizontal',
          passProps: {
            navigateBack: true
          }
        }
      });
    }
  }

  render() {
    const {
      isLoading
    } = this.state;
    const {
      legitimation,
      seatingType,
      assistancePickup,
      assistanceDrop,
      coTravellers,
      equipment
    } = this.props
    let coTravellersText = '', luggageText = '';
    if (!legitimation)
      return null;

    const { AllowedAssistances, AllowedCoTravellers, AllowedEquipment, AllowedSeatingTypes } = legitimation;

    if (coTravellers)
      coTravellersText = _.join(_.compact(_.map(AllowedCoTravellers, coTraveller => {
        return coTravellers.get(coTraveller.Key.Id) ? (coTravellers.get(coTraveller.Key.Id) + ' ' + coTraveller.Key.Name) : null;
      })), ', ');

    if (equipment)
      luggageText = _.join(_.compact(_.map(AllowedEquipment, equipmentItem => {
        return equipment.get(equipmentItem.Key.Id) ? (equipment.get(equipmentItem.Key.Id) + ' ' + equipmentItem.Key.Name) : null;
      })), ', ');


    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('bookingWizard.header.title')}</Text>
        </View>

        <WizardSteps step={4}/>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View accessible={true}>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../../assets/icons/section-seating.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.seatingType.title')}</Text>
            </View>
            {
              seatingType ? (
                <Touchable disabled={AllowedSeatingTypes.length === 1} onPress={() => this.props.updateBookingWizard({ seatingType : undefined})}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{seatingType.Name}</Text>
                      <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    {
                      AllowedSeatingTypes.length > 1 ? (
                        <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.seatingType.changeSeatingType')}</Text>
                      ) : null
                    }
                  </View>
                </Touchable>
              ) : (
                <View>
                  {
                    _.map(_.take(AllowedSeatingTypes, 3), (allowedSeatingType, index) => (
                      <Touchable key={index} onPress={() => this.props.updateBookingWizard({ seatingType : allowedSeatingType})}>
                        <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                          <Text style={styles.sectionText}>{allowedSeatingType.Name}</Text>
                          {
                            seatingType && seatingType.Id === allowedSeatingType.Id ? (
                              <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                            ) : (
                              <Image source={require('../../../assets/icons/radio-button.png')}/>
                            )
                          }
                        </View>
                      </Touchable>
                    ))
                  }

                  {
                    _.drop(AllowedSeatingTypes, 3).length > 3 ? (
                      <Touchable onPress={this._navigateToSeatingTypeScreen}>
                        <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                          <Text style={styles.sectionText}>{I18n.t('button.showMore')}</Text>
                          {
                            (
                              <Image source={require('../../../assets/icons/radio-button.png')}/>
                            )
                          }
                        </View>
                      </Touchable>
                    ) : null
                  }
                </View>
              )
            }
          </View>

          {
            AllowedAssistances.length > 0 ? (
              <View>
                <View style={{ height: 10 }}/>

                <View accessible={true}>
                  <View style={[styles.sectionTop, styles.sectionRow]}>
                    <Image source={require('../../../assets/icons/section-driver-assistance.png')}/>
                    <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.driverPickupAssistance.title')}</Text>
                  </View>
                  {
                    assistancePickup || assistancePickup === null ? (
                      <Touchable onPress={() => this.props.updateBookingWizard({ assistancePickup : undefined})}>
                        <View style={styles.sectionComplete}>
                          <View style={[styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{assistancePickup ? assistancePickup.Name : I18n.t('bookingWizard.driverAssistance.noAssistance')}</Text>
                            <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                          </View>
                          <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.driverAssistance.changeAssistance')}</Text>
                        </View>
                      </Touchable>
                    ) : (
                      <View>
                        <Touchable onPress={() => this.props.updateBookingWizard({ assistancePickup : null})}>
                          <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{I18n.t('bookingWizard.driverAssistance.noAssistance')}</Text>
                            {
                              assistancePickup === null ? (
                                <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                              ) : (
                                <Image source={require('../../../assets/icons/radio-button.png')}/>
                              )
                            }
                          </View>
                        </Touchable>

                        {
                          AllowedAssistances.length === 1  ? (
                            <Touchable onPress={this._selectPickupAssistance}>
                              <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                                <Text style={styles.sectionText}>{AllowedAssistances[0].Name}</Text>
                                {
                                  (
                                    <Image source={require('../../../assets/icons/radio-button.png')}/>
                                  )
                                }
                              </View>
                            </Touchable>
                          ) : (
                            <Touchable onPress={this._navigateToDriverPickupAssistanceScreen}>
                              <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                                <Text style={styles.sectionText}>{I18n.t('bookingWizard.driverAssistance.extraHelp')}</Text>
                                {
                                  (
                                    <Image source={require('../../../assets/icons/radio-button.png')}/>
                                  )
                                }
                              </View>
                            </Touchable>
                          )
                        }
                      </View>
                    )
                  }
                </View>
              </View>
            ) : null
          }

          {
            AllowedAssistances.length > 0 ? (
              <View>
                <View style={{ height: 10 }}/>

                <View accessible={true}>
                  <View style={[styles.sectionTop, styles.sectionRow]}>
                    <Image source={require('../../../assets/icons/section-driver-assistance.png')}/>
                    <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.driverDropAssistance.title')}</Text>
                  </View>
                  {
                    assistanceDrop || assistanceDrop === null ? (
                      <Touchable onPress={() => this.props.updateBookingWizard({ assistanceDrop : undefined})}>
                        <View style={styles.sectionComplete}>
                          <View style={[styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{assistanceDrop ? assistanceDrop.Name : I18n.t('bookingWizard.driverAssistance.noAssistance')}</Text>
                            <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                          </View>
                          <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.driverAssistance.changeAssistance')}</Text>
                        </View>
                      </Touchable>
                    ) : (
                      <View>
                        <Touchable onPress={() => this.props.updateBookingWizard({ assistanceDrop : null})}>
                          <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{I18n.t('bookingWizard.driverAssistance.noAssistance')}</Text>
                            {
                              assistanceDrop === null ? (
                                <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                              ) : (
                                <Image source={require('../../../assets/icons/radio-button.png')}/>
                              )
                            }
                          </View>
                        </Touchable>

                        {
                          AllowedAssistances.length === 1  ? (
                            <Touchable onPress={this._selectDropAssistance}>
                              <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                                <Text style={styles.sectionText}>{AllowedAssistances[0].Name}</Text>
                                {
                                  (
                                    <Image source={require('../../../assets/icons/radio-button.png')}/>
                                  )
                                }
                              </View>
                            </Touchable>
                          ) : (
                            <Touchable onPress={this._navigateToDriverDropAssistanceScreen}>
                              <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                                <Text style={styles.sectionText}>{I18n.t('bookingWizard.driverAssistance.extraHelp')}</Text>
                                {
                                  (
                                    <Image source={require('../../../assets/icons/radio-button.png')}/>
                                  )
                                }
                              </View>
                            </Touchable>
                          )
                        }
                      </View>
                    )
                  }
                </View>
              </View>
            ) : null
          }

          {
            AllowedCoTravellers.length > 0 ? (
              <View>
                <View style={{ height: 10 }}/>

                <View accessible={true}>
                  <View style={[styles.sectionTop, styles.sectionRow]}>
                    <Image source={require('../../../assets/icons/section-co-travellers.png')}/>
                    <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.coTravellers.title')}</Text>
                  </View>
                  {
                    coTravellers || coTravellers === null ? (
                      <Touchable onPress={() => this.props.updateBookingWizard({ coTravellers : undefined})}>
                        <View style={styles.sectionComplete}>
                          <View style={[styles.sectionRow, styles.spaceBetween]}>
                            <Text numberOfLines={1} style={[styles.flex1, styles.sectionText]}>{coTravellers && coTravellersText ? coTravellersText : I18n.t('bookingWizard.coTravellers.noCotravellers')}</Text>
                            <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                          </View>
                          <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.coTravellers.changeCoTravellers')}</Text>
                        </View>
                      </Touchable>
                    ) : (
                      <View>
                        <Touchable onPress={() => this.props.updateBookingWizard({ coTravellers : null})}>
                          <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{I18n.t('bookingWizard.coTravellers.noCotravellers')}</Text>
                            {
                              coTravellers === null ? (
                                <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                              ) : (
                                <Image source={require('../../../assets/icons/radio-button.png')}/>
                              )
                            }
                          </View>
                        </Touchable>

                        <Touchable onPress={this._navigateToCoTravellersScreen}>
                          <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                            <Text style={styles.sectionText}>{I18n.t('bookingWizard.coTravellers.chooseCoTravellers')}</Text>
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
              </View>
            ) : null
          }

          <View style={{ height: 10 }}/>

          <View accessible={true}>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../../assets/icons/section-luggage.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.luggageType.title')}</Text>
            </View>
            {
              equipment || equipment === null? (
                <Touchable onPress={() => this.props.updateBookingWizard({ equipment : undefined})}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text numberOfLines={1} style={[styles.flex1, styles.sectionText]}>{equipment && luggageText ? luggageText : I18n.t('bookingWizard.luggageType.noLuggage')}</Text>
                      <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.luggageType.changeLuggage')}</Text>
                  </View>
                </Touchable>
              ) : (
                <View>
                  <Touchable onPress={() => this.props.updateBookingWizard({ equipment : null})}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t('bookingWizard.luggageType.noLuggage')}</Text>
                      {
                        equipment === null ? (
                          <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
                        ) : (
                          <Image source={require('../../../assets/icons/radio-button.png')}/>
                        )
                      }
                    </View>
                  </Touchable>

                  <Touchable onPress={this._navigateToLuggageTypeScreen}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t('bookingWizard.luggageType.chooseLuggageType')}</Text>
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
              disabled={!seatingType}
              onPress={this._continue}
              title={I18n.t('button.continue')}/>
          </View>
        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default BookingOptionalsScreen;
