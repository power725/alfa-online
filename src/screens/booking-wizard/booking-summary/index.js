import BookingSummaryScreen from './booking-summary-screen';
import { getBookingSolution, confirmBooking } from '@redux/thunk';
import { BookingWizardCreators } from '@redux/actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    bookingWizard: state.bookingWizard
  };
}

const mapDispatchToProps = {
  confirmBooking,
  getBookingSolution,
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingSummaryScreen);
