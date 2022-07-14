import DashboardScreen from './dashboard-screen';
import { connect } from 'react-redux';
import UserActions from '@redux/actions/user.actions';
import { BookingWizardCreators, NotificationCreators, MiscCreators } from '@redux/actions';
import {
  changeActiveProfile,
  getActiveProfile,
  getBookings,
  getCustomerSettings,
  markNotificationsRead
} from '@redux/thunk';

function mapStateToProps(state) {
  return {
    activeProfile: state.user.activeProfile,
    authToken: state.user.authToken,
    currentUser: state.user.data,
    bookings: state.bookings.data,
    notifications: state.notifications,
    activeProfilePopupShown: state.misc.activeProfilePopupShown
  };
}

const mapDispatchToProps = {
  logout: UserActions.logout,
  setUser: UserActions.setUser,
  changeActiveProfile,
  getActiveProfile,
  getBookings,
  getCustomerSettings,
  resetBookingWizard: BookingWizardCreators.resetBookingWizard,
  markNotificationsRead,
  openPopup: NotificationCreators.openPopup,
  updatePushNotification: NotificationCreators.updatePushNotification,
  showActiveProfilePopup: MiscCreators.showActiveProfilePopup
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
