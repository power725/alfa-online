import AddUserAddressModal from './add-user-address-modal';
import { connect } from 'react-redux';
import { createCustomerAddress, updateCustomerAddress } from '@redux/thunk';

function mapStateToProps(state) {
  return {
    addressTypes: state.user.settings.AvailableQuickAddressTypes
  }
}

const mapDispatchToProps = {
  createCustomerAddress,
  updateCustomerAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserAddressModal);
