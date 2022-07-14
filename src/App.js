import { Navigation } from 'react-native-navigation';
import { AppState, Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import { registerScreens } from './screens';
import configureStore from '@redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import EventBus from 'eventing-bus';
import UserActions from '@redux/actions/user.actions';
import { checkCustomerSession, markNotificationsRead } from '@web-services';
import OneSignal from 'react-native-onesignal';
import Config from 'react-native-config';
import I18n from '@locales';
import * as Sentry from "@sentry/react-native";
import Analytics from './helpers/analytics';

let appState = null;
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
OneSignal.setAppId(Config.ONE_SIGNAL_APP_ID)
OneSignal.setLogLevel(6, 0);

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log('promptForPushNotificationsWithUserResponse response', response);
});

// OneSignal.inFocusDisplaying(0);
Sentry.init({
  dsn: Config.SENTRY_DSN,
  ignoreErrors: [
    'Network request failed',
    'Failed to fetch',
    'NetworkError',
    'Network Error',
    'Network failed',
    '/Network Error/'
  ]
});


if (Platform.OS == "ios") {
  KeyboardManager.setEnable(true);
}

const onSetRoot = (componentName) => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: componentName
              }
            }
          ],
          options: {
            topBar: {
              visible: false,
              height: 0
            }
          }
        }
      }
    });
}

function startApp(initialState) {

    const { user: { authToken } } = initialState;

    if (authToken) {
      onSetRoot('dashboardScreen')
    } else {
      onSetRoot('signInScreen')
    }
}

function initializeApp() {
  var store = configureStore();
  appState = AppState.currentState;
  registerScreens(store, Provider);
  global.AppStore = store;

  store.subscribe(() => {
  });

  handleAppStateChange = (nextAppState) => {
    var { user } = store.getState();

    if (user.authToken && appState.match(/inactive|background/) && nextAppState === 'active') {
      checkCustomerSession(user.authToken)
        .then(response => {
          if (response.data.AuthenticationState == 'NotAuthorized') {
            Navigation.showOverlay({
              component: {
                name: 'alertModal',
                animationType: 'none',
                passProps: {
                  title: 'Error!',
                  animationType: 'none',
                  message: I18n.t('error.sessionExpired'),
                  onConfirm: componentId => {
                    store.dispatch(UserActions.logout());
                    Navigation.dismissOverlay(componentId);
                  }
                }
              }
            });
          }
          else
          {
            var userId = analytics.user('userId');
            if (userId)
            {
              Analytics.trackWithProperties('Customer session is still valid for ' + response.data.Customer.Username, { 'Username': response.data.Customer.Username });
              Analytics.identify(response.data.Customer.Username);
            }
          }
        })
        .catch(error => {});
    }
    appState =  nextAppState
  }

  if (store.getState()._persist) {
    var initialState = store.getState();
    startApp(initialState);

    AppState.addEventListener('change', handleAppStateChange);
  } else {
    persistStore(store, null, () => {
      var initialState = store.getState();
      startApp(initialState);

      AppState.addEventListener('change', handleAppStateChange);
    });
  }

  EventBus.on('logout', () => {
    store.dispatch(UserActions.logout());
  });

  EventBus.on('authenticationStateChanged', () => {
    var initialState = store.getState();
    startApp(initialState);
  })
}

initializeApp();
