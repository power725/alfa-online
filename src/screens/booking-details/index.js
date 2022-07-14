import BookingDetailsScreen from './booking-details-screen';
import { connect } from 'react-redux';
import { BookingWizardCreators } from '@redux/actions';
import {
  getBooking,
  getRouteNodes,
  getVehiclePosition,
  cancelBooking
} from '@redux/thunk';

const mapDispatchToProps = {
  getBooking,
  getRouteNodes,
  getVehiclePosition,
  cancelBooking,
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
}

export default connect(null, mapDispatchToProps)(BookingDetailsScreen);
