import UserAddressesScreen from './user-addresses-screen';
import { getCustomerAddresses } from '@redux/thunk';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    customerAddresses: state.addresses.data
  };
}

const mapDispatchToProps = {
  getCustomerAddresses
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressesScreen);
