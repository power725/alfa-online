import NotificationAlertModalView from './notification-alert-modal';
import { connect } from 'react-redux';
import { NotificationCreators } from '@redux/actions';

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

const mapDispatchToProps = {
  openPopup: NotificationCreators.openPopup,
  updatePushNotification: NotificationCreators.updatePushNotification
};

const NotificationAlertModal = connect(mapStateToProps, mapDispatchToProps)(NotificationAlertModalView);

export { NotificationAlertModal };
