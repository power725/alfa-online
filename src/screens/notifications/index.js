import NotificationsScreen from './notifications-screen';
import { getActorNotifications, markNotificationsRead } from '@redux/thunk';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

const mapDispatchToProps = {
  getActorNotifications,
  markNotificationsRead
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);
