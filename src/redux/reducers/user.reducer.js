import { createReducer } from 'reduxsauce'
import { UserTypes as Types } from '../actions';
import storeInitialState from '../store/initial-state';
import { Types as ReduxSauceTypes } from 'reduxsauce';
import EventBus from 'eventing-bus';

export const INITIAL_STATE = storeInitialState.user;

export const startAuthenticationFailure = (state, action) => {
  return {
    ...state,
    loading: false
  };
}

export const startAuthenticationRequest = (state, action) => {
  return {
    ...state,
    loading: true
  };
}

export const startAuthenticationSuccess = (state, action) => {
  return {
    ...state,
    sessionId: action.authResponse.SessionId,
    loading: false
  };
}

export const authenticationSuccess = (state, action) => {
  return {
    ...state,
    data: action.authResponse.Customer,
    authToken: action.authResponse.AuthenticationToken,
    loading: false
  };
}

export const setActiveProfile = (state, action) => {
  const { activeProfile } = action;

  return {
    ...state,
    activeProfile
  };
}

export const setUser = (state, action) => {
  const { user } = action;

  return {
    ...state,
    data: user
  }
}

export const setSettings = (state, action) => {
  const { settings } = action;

  return {
    ...state,
    settings
  }
}

export const updateProfile = (state, action) => {
  const { profile } = action;

  return {
    ...state,
    data: {...state.data, ...profile},
    activeProfile: {...state.activeProfile, ...profile}
  }
}

logout = (state, action) => {
  setTimeout(() => {
    EventBus.publish('authenticationStateChanged');
  }, 100);

  return INITIAL_STATE;
}

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.START_AUTHENTICATION_FAILURE]:     startAuthenticationFailure,
  [Types.START_AUTHENTICATION_REQUEST]:     startAuthenticationRequest,
  [Types.START_AUTHENTICATION_SUCCESS]:     startAuthenticationSuccess,
  [Types.AUTHENTICATION_SUCCESS]:           authenticationSuccess,
  [Types.SET_ACTIVE_PROFILE]:               setActiveProfile,
  [Types.SET_USER]:                         setUser,
  [Types.SET_SETTINGS]:                     setSettings,
  [Types.UPDATE_PROFILE]:                   updateProfile,
  [Types.LOGOUT]:                           logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
