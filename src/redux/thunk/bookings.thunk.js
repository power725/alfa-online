import { BookingCreators } from '../actions/bookings.actions';
import * as WebService from '@web-services';

export function getBookings() {
  return function(dispatch, getState) {
    var { user: { authToken } } = getState();
    dispatch(BookingCreators.getDashboardBookingsRequest());

    return WebService.getDashboardBookings(authToken)
      .then(response => {
        dispatch(BookingCreators.getDashboardBookingsSuccess(response.data.Bookings));

        return response;
      })
      .catch(error => {
        dispatch(BookingCreators.getDashboardBookingsFailure());
      });
  }
}

export function getBooking(BookingId, params) {
  return function(dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.getBooking(authToken, BookingId, params);
  }
}

export function cancelBooking(BookingId) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.cancelBooking(authToken, BookingId)
      .then(response => {
        dispatch(BookingCreators.cancelBooking(BookingId));

        return response;
      });
  }
}

export function getRouteNodes(BookingId) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.getRouteNodes(authToken, BookingId);
  }
}

export function getSuitableLegitimation(queryParams) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.getSuitableLegitimation(authToken, queryParams);
  }
}

export function getBookingSolution(params) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.getBookingSolution(authToken, params);
  }
}

export function confirmBooking(params) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.confirmBooking(authToken, params);
  }
}

export function getVehiclePosition(BookingId) {
  return function (dispatch, getState) {
    var {user: { authToken }} = getState();

    return WebService.getVehiclePosition(authToken, BookingId);
  }
}
