import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Config from 'react-native-config';
import styles from './auth-wait-screen.style';
import {
  BorderButton,
  Button,
  Screen,
  Text
} from '@components';
import I18n from '@locales';
import * as Progress from 'react-native-progress';
import { startBankIdAuthentication, fetchBankIdAuthenticationResult } from '@web-services';
import DeviceInfo from 'react-native-device-info';
import EventBus from 'eventing-bus';
import { COLOR } from '@constants';
import Analytics from '../../helpers/analytics';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';

class AuthWait extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);

    this.shouldPoll = true;
    this.lastPoll = null;

    this.state = {
      SessionId: null,
      bankIdAppAvailable: false
    }
  }

  componentDidMount() {
    var { code, startAuthenticationSuccess } = this.props;
    var authParams = {
      populationRegistryNumber: code,
      deviceUUID: DeviceInfo.getUniqueID(),
      osName: Platform.OS,
      osVersion: Platform.Version,
      deviceModel: DeviceInfo.getModel(),
      appVersion: DeviceInfo.getReadableVersion()
    };

    Analytics.trackWithProperties('Login Request', { 'params': authParams });

    startBankIdAuthentication(authParams)
      .then(response => {
        // console.log('1 response startBankIdAuthentication', response);
        this.setState({ SessionId: response.data.SessionId }, () => {
          const uriScheme = 'bankid:///' + (Platform.OS === 'ios' ? '?redirect=' + Config.URL_SCHEME + ':///' : '');

          Linking.canOpenURL(uriScheme).then(supported => {
            this.setState({ bankIdAppAvailable: supported });

            if (supported) {
              Linking.openURL(uriScheme);
            }
          }).catch(err => {
            Analytics.trackWithProperties('Failed opening BankId', { 'error': err });
            this.setState({ bankIdAppAvailable: false });
          });

          if (this.shouldPoll)
            this._fetchBankIdAuthenticationResult();
        });
      })
      .catch(error => {
        // console.log('1 ERROR startBankIdAuthentication', error);
        Analytics.trackWithProperties('Login Failed', { 'exception': error.response });

        if (error.response && error.response.data) {
          var showOwnError = error.response.status === 404 || error.response.status === 409 || error.response.status === 500 || error.response.status === 403;

          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              animationType: 'none',
              passProps: {
                title: error.response.status,
                message: showOwnError ? I18n.t('error.loginFailure') : error.response.data.ResponseStatus.Message,
                onConfirm: componentId => {
                  Navigation.dismissOverlay(componentId);
                  this._navigateToPreviousScreen();
                }
              }
            }
          });
        }
        else {
          setTimeout(this._navigateToPreviousScreen, 1000);
        }
      });
  }

  componentWillUnmount() {
    this.shouldPoll = false;
  }

  _fetchBankIdAuthenticationResult = () => {
    const { authenticationSuccess } = this.props;
    this.lastPoll = moment();

    fetchBankIdAuthenticationResult(this.state.SessionId)
      .then(response => {
        // console.log('2 fetchBankIdAuthenticationResult', response);
        if (!response) {
          this._fetchBankIdAuthenticationResult();
        }

        else if (!response?.data) {
          console.log('response.data', response.data);
          return;
        }

        else if (response?.data?.AuthenticationState === 'Success') {
          Analytics.trackWithProperties('Login Successful', { 'Username': response.data.Customer.Username });
          authenticationSuccess(response.data);

          OneSignal.addSubscriptionObserver(event => {
            const params = {
              PushNotificationToken: event.to.userId
            };
            this.props.updatePushNotificationToken(params);
          });

          Analytics.track('Login Complete Dashboard');
          Analytics.identify(response.data.Customer.Username);
          Navigation.setRoot({
            root: {
              stack: {
                children: [
                  {
                    component: {
                      name: 'dashboardScreen',
                    }
                  }
                ]
              }
            }
          });
        }
        else if (response?.data?.AuthenticationState === 'Failure') {

          Analytics.trackWithProperties('Login Failed', { 'error': response.data });
          Navigation.showOverlay({
            component: {
              name: 'alertModal',
              passProps: {
                title: I18n.t('error.failure'),
                message: I18n.t('error.loginFailure'),
                onConfirm: componentId => {
                  Navigation.dismissOverlay(componentId);
                  this._navigateToPreviousScreen();
                }
              }
            }
          });
        }

        else if (this.shouldPoll) {
          var pollingDelay = moment().subtract(3, 'seconds');
          var difference = pollingDelay.diff(this.lastPoll);

          if (this.lastPoll.isSameOrBefore(pollingDelay)) {
            this._fetchBankIdAuthenticationResult();
          }
          else if (difference < 0) {
            setTimeout(this._fetchBankIdAuthenticationResult, Math.abs(difference));
          }
        }
      })
      .catch(error => {
        console.log('2 error fetchBankIdAuthenticationResult', error.response);
        if (error?.__CANCEL__)
          this._fetchBankIdAuthenticationResult();
        else {
          Analytics.trackWithProperties('Login Failed', { 'exception': error?.response && error.response });

          if (error?.response && error?.response?.data?.ResponseStatus) {

            var message = error.response.data.ResponseStatus.Message;

            if (error.response.status === 404) // overwrite error message fro server, so we can translate it
            {
              message = I18n.t('signIn.errors.customerNotFound');
            }

            Navigation.showOverlay({
              component: {
                name: 'alertModal',
                passProps: {
                  title: I18n.t('error.failure'),
                  message: message,
                  onConfirm: (componentId) => {
                    Navigation.dismissOverlay(componentId);
                    this._navigateToPreviousScreen();
                  }
                }
              }
            })
          }
          else
            this._fetchBankIdAuthenticationResult();
        }
      });
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _abort = () => {
    this._navigateToPreviousScreen();
  }

  render() {
    const { bankIdAppAvailable, buttonEnabled, code, codeValid, SessionId } = this.state;
    var message = I18n.t('fetchingMessage');

    if (SessionId) {
      if (bankIdAppAvailable)
        message = I18n.t('waitingBankId')
      else
        message = I18n.t('startBankIDMessage')
    }

    return (
      <Screen
        backgroundImage={require('../../assets/bg.png')}
        style={styles.container}
        contentContainerStyle={styles.containerContentcontainer}>
        <Image style={{ alignSelf: 'center', marginBottom: -46, zIndex: 1 }} source={require('../../assets/alert-exclamantion.png')} />
        <View style={styles.contentContainer}>
          <Text style={styles.descriptionLarge}>{message}</Text>

          <View style={{ alignItems: 'center' }}>
            <Progress.Circle
              size={50}
              color={COLOR.ACTIVITY_INDICATOR}
              indeterminate={true} />
          </View>

          <View style={styles.spacer10} />

          <BorderButton
            title={I18n.t('button.abort')}
            style={styles.button}
            onPress={this._abort} />
        </View>
      </Screen>
    );
  }
}

export default AuthWait;
