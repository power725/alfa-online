import React, { Component } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import {
  BorderButton,
  Loader,
  Screen,
  Text,
  Touchable
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import styles from './contact-screen.style';
import { COLOR } from '@constants';
import Placeholder from 'rn-placeholder';
import _ from 'lodash';
import Communications from 'react-native-communications';
import I18n from '@locales';

class ContactScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    address: I18n.t('placeholder.notAvailable'),
    email: I18n.t('placeholder.notAvailable'),
    name: I18n.t('placeholder.notAvailable'),
    openingHours: I18n.t('placeholder.notAvailable'),
    phoneNumber1: I18n.t('placeholder.notAvailable'),
    phoneNumber2: I18n.t('placeholder.notAvailable'),
    isLoading: true
  }

  componentDidMount() {
    this.props.getCallCenterInfo()
      .then(response => {
        const { CallCenterInfo } = response.data;

        this.setState({
          address: CallCenterInfo.Address,
          email: CallCenterInfo.Email,
          name: CallCenterInfo.Name,
          openingHours: CallCenterInfo.OpeningHoursRows,
          phoneNumber1: CallCenterInfo.PhoneNumber1,
          phoneNumber2: CallCenterInfo.PhoneNumber2,
          isLoading: false
        })
      })
      .catch(error => {

      });
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  render() {
    const {
      address,
      email,
      name,
      openingHours,
      phoneNumber1,
      phoneNumber2,
      isLoading
    } = this.state;

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('placeholder.contact')}</Text>
        </View>
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View style={[styles.sectionTop, styles.formGroup]}>
            <Text style={styles.name}>{name}</Text>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.label}>{I18n.t('placeholder.address')}</Text>
            <Text style={styles.value}>{address}</Text>
          </View>

          <Touchable onPress={() => { Communications.email([email], null, null, '', ''); }}>
            <View style={[styles.sectionMiddle, styles.formGroup]}>
              <Text style={styles.label}>{I18n.t('placeholder.email')}</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          </Touchable>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.label}>{I18n.t('placeholder.openingHours')}</Text>
            {
              _.map(openingHours, (ohrs, index) => (
                <Text key={index} style={styles.value}>{ohrs}</Text>
              ))
            }
          </View>

          <Touchable onPress={() => {Communications.phonecall(phoneNumber1, true)}}>
            <View style={[styles.sectionMiddle, styles.formGroup]}>
              <Text style={styles.label}>{I18n.t('placeholder.phoneNumber1')}</Text>
              <Text style={styles.value}>{phoneNumber1}</Text>
            </View>
          </Touchable>

          <Touchable onPress={() => {Communications.phonecall(phoneNumber2, true)}}>
            <View style={[styles.sectionMiddle, styles.formGroup]}>
              <Text style={styles.label}>{I18n.t('placeholder.phoneNumber2')}</Text>
              <Text style={styles.value}>{phoneNumber2}</Text>
            </View>
          </Touchable>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <BorderButton
              textStyle={styles.backButtonText}
              title={I18n.t('button.back')}
              onPress={this._navigateToPreviousScreen}/>
          </View>
          <View style={styles.buttonSpace}/>
          <View style={styles.buttonContainer} />
        </View>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default ContactScreen;
