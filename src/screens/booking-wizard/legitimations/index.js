import LegitimationsScreen from './legitimations-screen';
import { connect } from 'react-redux';
import { BookingWizardCreators } from '@redux/actions';
import { getSuitableLegitimation } from '@redux/thunk';

function mapStateToProps(state) {
  return {
    ...state.bookingWizard
  }
}

const mapDispatchToProps = {
  getSuitableLegitimation,
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
}

export default connect(mapStateToProps, mapDispatchToProps)(LegitimationsScreen);
