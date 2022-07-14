import { createReducer } from 'reduxsauce'
import { AddressesTypes as Types, UserTypes } from '../actions';
import storeInitialState from '../store/initial-state';

export const INITIAL_STATE = storeInitialState.addresses;

export const setAddresses = (state, action) => {
  const { addresses } = action;

  return {
    ...state,
    data: addresses,
    loading: false
  };
}

export const addAddress = (state, action) => {
  const { address } = action;

  return {
    ...state,
    data: [...state.data, address],
    loading: false
  };
}

export const updateAddress = (state, action) => {
  const { address } = action;

  return {
    ...state,
    data: state.data.map(ad => ad.Id === address.Id ? address : ad),
    loading: false
  };
}

export const setNearbyAddresses = (state, action) => {
  const { nearbyAddresses } = action;

  return {
    ...state,
    nearbyAddresses,
    loading: false
  };
}

export const setPrevUsedAddresses = (state, action) => {
  const { prevUsedAddresses } = action;

  return {
    ...state,
    prevUsedAddresses,
    loading: false
  };
}

export const setActiveProfile = (state, action) => {
  const { activeProfile } = action;

  return {
    ...state,
    data: activeProfile.CustomerAddresses
  };
}

logout = (state, action) => INITIAL_STATE

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.SET_ADDRESSES]:              setAddresses,
  [Types.ADD_ADDRESS]:                addAddress,
  [Types.UPDATE_ADDRESS]:             updateAddress,
  [Types.SET_NEARBY_ADDRESSES]:       setNearbyAddresses,
  [Types.SET_PREV_USED_ADDRESSES]:    setPrevUsedAddresses,
  [UserTypes.SET_ACTIVE_PROFILE]:     setActiveProfile,
  [UserTypes.LOGOUT]:                 logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
