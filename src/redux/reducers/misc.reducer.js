import { createReducer } from 'reduxsauce'
import { MiscTypes as Types, UserTypes } from '../actions';
import storeInitialState from '../store/initial-state';

export const INITIAL_STATE = storeInitialState.misc;

export const showActiveProfilePopup = (state, action) => {
  return {
    ...state,
    activeProfilePopupShown: true
  };
}

logout = (state, action) => INITIAL_STATE

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.SHOW_ACTIVE_PROFILE_POPUP]: showActiveProfilePopup,
  [UserTypes.LOGOUT]:                 logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
