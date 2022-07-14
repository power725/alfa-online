import axios from 'axios';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';
import EventBus from 'eventing-bus';
import { Notification } from '@helpers';
import Analytics from './analytics';

const CancelToken = axios.CancelToken;
import I18n from '@locales';
import * as Sentry from "@sentry/react-native";

export class API {
  static headers() {
    return {
      "Content-Type":   "application/json",
      "DeviceUUID":     DeviceInfo.getUniqueID(),
      "AppVersionCode": DeviceInfo.getReadableVersion()
    }
  }

  static request(options) {
    options.headers = _.merge(this.headers(), options.headers);
    const source = CancelToken.source();
    options.cancelToken = source.token;
    const timeoutHandler = setTimeout(() => {
      source.cancel();
    }, 15000);

    return axios(options)
      .then(response => {
        clearTimeout(timeoutHandler);

        return response;
      })
      .catch(error => {
        clearTimeout(timeoutHandler);
        if (options.silent === true) {
          throw error;
        }
        else if (error.message == 'Network Error') {
          axios({
            method: 'get',
            url: 'https://google.com'
          })
            .then(response => {
              if (!options.silent)
                Notification.error(I18n.t(`error.unableToReachServer`)); //unable to reach server
                Sentry.captureException('Unable to reach server');
              throw error;
            })
            .catch(err => {
              if (!options.silent)
                Notification.error(I18n.t(`error.checkInternetConnection`)); // Please check your internet connection
              throw error;
            });
        }
        else {
          if (error.response && error.response.status == 401) {
            Analytics.track('Session invalid');
            EventBus.publish('logout');

            if (!options.silent)
              setTimeout(() => {
                Notification.error(error.response.data.ResponseStatus.Message);
              }, 1000);
          }
          else if (error.response && error.response.status == 403 && !options.silent) {
            Notification.error(error.response.data.ResponseStatus.Message);
          }

          const errorKeys = Object.keys(error);

          if (errorKeys.length === 1 && errorKeys[0] === 'message' && error['message'] === undefined)
          {
            Analytics.trackWithProperties('Request timeout', {'error': error.response, 'url' : options.url });
            Notification.error(I18n.t('error.requestTimeout'));
          }

          throw error;
        }
      });
  }
}
