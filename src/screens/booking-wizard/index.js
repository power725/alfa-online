import BookingWizardScreen from './booking-wizard-screen';
import { connect } from 'react-redux';
import { BookingWizardCreators } from '@redux/actions';

function mapStateToProps(state) {
  return {
    bookingWizard: state.bookingWizard,
  };
}

const mapDispatchToProps = {
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingWizardScreen);
