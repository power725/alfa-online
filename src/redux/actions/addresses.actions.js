import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setAddresses: ['addresses'],
  addAddress:   ['address'],
  updateAddress: ['address'],
  setNearbyAddresses: ['nearbyAddresses'],
  setPrevUsedAddresses: ['prevUsedAddresses']
});

export const AddressesTypes = Types;
export const AddressesCreators = Creators;
