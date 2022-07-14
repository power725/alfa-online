import BookingOptionalsScreen from './booking-optionals-screen';
import { connect } from 'react-redux';
import { BookingWizardCreators } from '@redux/actions';

function mapStateToProps(state) {
  return {
    ...state.bookingWizard
  };
}

const mapDispatchToProps = {
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingOptionalsScreen);
