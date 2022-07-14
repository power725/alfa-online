import * as WebService from '@web-services';

export function getCallCenterInfo() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getCallCenterInfo(authToken);
  }
}

export function updatePushNotificationToken(params) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.updatePushNotificationToken(authToken, params);
  }
}

export function sendNotification(params) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.sendNotification(authToken, params)
      .then(response => {
      });
  }
}

export function markNotificationsRead(params) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.markNotificationsRead(authToken, params);
  }
}
