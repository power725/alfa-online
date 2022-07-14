import AddressSearchScreen from './address-search-screen';
import { connect } from 'react-redux';
import { searchAddresses } from '@redux/thunk';

function mapStateToProps(state) {
  return {
    userAddresses: state.addresses.data
  }
}

const mapDispatchToProps = {
  searchAddresses
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchScreen);
