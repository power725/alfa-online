import UserActions from '../actions/user.actions';
import * as WebService from '@web-services';

export function getActiveProfile() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getActiveProfile(authToken)
      .then(response => {
        dispatch(UserActions.setActiveProfile(response.data.Customer));

        return response;
      });
  }
}

export function changeActiveProfile(customerId) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.changeActiveProfile(authToken, customerId)
      .then(response => {
        dispatch(UserActions.setActiveProfile(response.data.Customer));

        return response;
      });
  }
}

export function getCustomerSettings() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getCustomerSettings(authToken)
      .then(response => {
        dispatch(UserActions.setSettings(response.data.CustomerSettings));

        return response;
      });
  }
}

export function searchAddresses(searchText) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.searchAddresses(authToken, searchText);
  }
}

export function updateCustomerSettings(settings) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.updateCustomerSettings(authToken, settings)
      .then(response => {
        dispatch(UserActions.setSettings(response.data.CustomerSettings));

        return response;
      });
  }
}

export function closeCustomerSession() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.closeCustomerSession(authToken)
      .then(response => {
        dispatch(UserActions.logout());

        return response;
      });
  }
}

export function getNextInvoice() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getNextInvoice(authToken);
  }
}

export function updateProfile(profileParams) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.updateProfile(authToken, profileParams)
      .then(response => {
        dispatch(UserActions.updateProfile(profileParams));

        return response;
      });
  }
}

export function getActorNotifications(params) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getActorNotifications(authToken, params);
  }
}
