import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  updateBookingWizard: ['bookingParams'],
  resetBookingWizard: null
});

export const BookingWizardTypes = Types;
export const BookingWizardCreators = Creators;
