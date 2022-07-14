import { createReducer } from 'reduxsauce'
import { BookingTypes as Types, UserTypes } from '../actions';
import storeInitialState from '../store/initial-state';

export const INITIAL_STATE = storeInitialState.bookings;

export const getDashboardBookingsFailure = (state, action) => {
  return {
    ...state,
    loading: false
  };
}

export const getDashboardBookingsRequest = (state, action) => {
  return {
    ...state,
    loading: true
  };
}

export const getDashboardBookingsSuccess = (state, action) => {
  const { bookings } = action;

  return {
    data: bookings,
    loading: false
  };
}

export const cancelBooking = (state, action) => {
  const { bookingId } = action;
  const bookings = state.data.map(booking => {
    return booking.Id == bookingId ? {
      ...booking,
      BookingState: 'Cancelled',
      Jobs: booking.Jobs.map(job => ({...job, JobState: 'Cancelled'}))
    } : booking
  });

  return {
    data: bookings,
    loading: false
  };
}

logout = (state, action) => INITIAL_STATE

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_DASHBOARD_BOOKINGS_FAILURE]:     getDashboardBookingsFailure,
  [Types.GET_DASHBOARD_BOOKINGS_REQUEST]:     getDashboardBookingsRequest,
  [Types.GET_DASHBOARD_BOOKINGS_SUCCESS]:     getDashboardBookingsSuccess,
  [Types.CANCEL_BOOKING]:                     cancelBooking,
  [UserTypes.LOGOUT]:                         logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
