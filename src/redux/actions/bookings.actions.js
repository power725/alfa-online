import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getDashboardBookingsFailure: null,
  getDashboardBookingsRequest: null,
  getDashboardBookingsSuccess: ['bookings'],
  cancelBooking: ['bookingId']
});

export const BookingTypes = Types;
export const BookingCreators = Creators;
