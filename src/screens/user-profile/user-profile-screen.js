import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Loader,
  Screen,
  Text,
  TextInput
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './user-profile-screen.style';
import validator from 'validator';
import { Notification } from '@helpers';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '@locales';
import { COLOR } from '@constants';

class UserProfile extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);

    const { user: { activeProfile } } = props;

    this.state = {
      email: activeProfile.Email,
      phoneNumber: activeProfile.Telephone,
      isLoading: false
    };
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _submit = () => {
    const { email, phoneNumber } = this.state;
    const errorMessages = [];

    if (email && !validator.isEmail(email))
      errorMessages.push(I18n.t('validation.valid.email'));


    if (phoneNumber && !validator.isMobilePhone(phoneNumber))
      errorMessages.push(I18n.t('validation.valid.phoneNumber'));

    if (errorMessages.length > 0) {
      Notification.error(errorMessages.join('\n'));

      return;
    }

    const profileParams = {
      Email: email,
      Telephone: phoneNumber
    };

    this.setState({ isLoading: true });
    this.props.updateProfile(profileParams)
      .then(response => {
        this.setState({ isLoading: false }, this._navigateToPreviousScreen);
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { user: { data: currentUser }, user: { activeProfile } } = this.props;
    const { email, isLoading, phoneNumber } = this.state;

    if (!activeProfile || !currentUser)
      return null;

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('userProfile.title')}</Text>
        </View>

        <View style={{paddingHorizontal: 15, flex: 1}}>
          <View style={styles.sectionTop}>
            <TextInput
              placeholder={I18n.t('placeholder.email')}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType={'email-address'}
              validation={(email) => {
                return !email || validator.isEmail(email);
              }} />

            <View style={{height: 10}}/>

            <TextInput
              placeholder={I18n.t('placeholder.phoneNumber')}
              value={phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              keyboardType={'numeric'}
              validation={(phoneNumber) => {
                return !phoneNumber || validator.isMobilePhone(phoneNumber);
              }} />
          </View>

          <View style={styles.sectionMiddle}>
            <View style={styles.invoiceBodyRow}>
              <Text style={styles.invoiceBodyLabel}>{I18n.t('placeholder.name')}{':'}</Text>
              <Text style={styles.invoiceBodyValue}>{activeProfile.Firstname + ' ' + activeProfile.Lastname}</Text>
            </View>
            <View style={[styles.invoiceBodyRow, styles.invoiceBodyBottomRow]}>
              <Text style={styles.invoiceBodyLabel}>{I18n.t('placeholder.customerNumber')}{': '}</Text>
              <Text style={styles.invoiceBodyValue}>{activeProfile.Username}</Text>
            </View>
          </View>

          <View style={styles.sectionBottom}>
            <View>
              <Text style={styles.invoiceBodyLabel}>{I18n.t('placeholder.legitimations')}</Text>
              {
                activeProfile.LegitimationInfoStrings.length > 0 ? activeProfile.LegitimationInfoStrings.map((legitimation, index) => (
                  <Text key={index} style={styles.legitimationValue}>{legitimation}</Text>
                )) : <Text style={styles.legitimationValue}>{I18n.t('placeholder.notAvailable')}</Text>
              }
            </View>
          </View>
        </View>

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
            {
              currentUser.Id === activeProfile.Id ? (
                <Button
                  onPress={this._submit}
                  gradient={false}
                  style={styles.buttonLogOff}
                  title={I18n.t('button.update')}/>
              ) : null
            }
          </View>
        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default UserProfile;
