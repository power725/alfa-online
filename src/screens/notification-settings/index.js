import NotificationSettingsScreen from './notification-settings-screen';
import { connect } from 'react-redux';
import { updateCustomerSettings } from '@redux/thunk';

function mapStateToProps(state) {
  return {
    customers: state.user.settings.AvailableCustomers,
    settings: state.user.settings,
  };
}

const mapDispatchToProps = {
  updateCustomerSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettingsScreen);
