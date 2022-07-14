import SettingsScreen from './settings-screen';
import { closeCustomerSession, getNextInvoice } from '@redux/thunk';
import UserActions from '@redux/actions/user.actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  closeCustomerSession,
  getNextInvoice,
  logout: UserActions.logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
