import { AddressesCreators } from '../actions/addresses.actions';
import * as WebService from '@web-services';

export function getCustomerAddresses() {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getCustomerAddresses(authToken)
      .then(response => {
        dispatch(AddressesCreators.setAddresses(response.data.CustomerAddresses));

        return response;
      });
  }
}

export function createCustomerAddress(addressParams) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.createCustomerAddress(authToken, addressParams)
      .then(response => {
        dispatch(AddressesCreators.addAddress(response.data.CustomerAddress));

        return response;
      });
  }
}

export function updateCustomerAddress(addressParams) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.updateCustomerAddress(authToken, addressParams)
      .then(response => {
        dispatch(AddressesCreators.updateAddress(response.data.CustomerAddress));

        return response;
      });
  }
}

export function getClosestAddresses(geolocation) {
  return function(dispatch, getState) {
    const { user: { authToken } } = getState();

    return WebService.getClosestAddresses(authToken, geolocation)
      .then(response => {
        dispatch(AddressesCreators.setNearbyAddresses(response.data.NearbyAddresses));
        dispatch(AddressesCreators.setPrevUsedAddresses(response.data.PrevUsedAddresses));

        return response;
      });
  }
}
