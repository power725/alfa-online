import { createReducer } from 'reduxsauce'
import { BookingWizardTypes as Types, UserTypes } from '../actions';
import storeInitialState from '../store/initial-state';

export const INITIAL_STATE = storeInitialState.bookingWizard;

export const updateBookingWizard = (state, action) => {
  const { bookingParams } = action;

  return {
    ...state,
    ...bookingParams
  };
}

export const resetBookingWizard = (state, action) => INITIAL_STATE;

logout = (state, action) => INITIAL_STATE

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.UPDATE_BOOKING_WIZARD]:      updateBookingWizard,
  [Types.RESET_BOOKING_WIZARD]:       resetBookingWizard,
  [UserTypes.LOGOUT]:                 logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
