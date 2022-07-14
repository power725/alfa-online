import BookingPickupAddressScreen from './booking-pickup-address-screen';
import { getCustomerAddresses, getSuitableLegitimation, getClosestAddresses } from '@redux/thunk';
import { BookingWizardCreators } from '@redux/actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    ...state.bookingWizard,
    customerAddresses: state.addresses.data,
    nearbyAddresses: state.addresses.nearbyAddresses,
    prevUsedAddresses: state.addresses.prevUsedAddresses
  };
}

const mapDispatchToProps = {
  getClosestAddresses,
  getCustomerAddresses,
  getSuitableLegitimation,
  updateBookingWizard: BookingWizardCreators.updateBookingWizard,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingPickupAddressScreen);
