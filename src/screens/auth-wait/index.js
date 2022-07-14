import AuthWait from './auth-wait-screen';
import { connect } from 'react-redux';
import UserActions from '@redux/actions/user.actions';
import { updatePushNotificationToken } from '@redux/thunk';

const mapDispatchToProps = {
  startAuthenticationSuccess: UserActions.startAuthenticationSuccess,
  authenticationSuccess: UserActions.authenticationSuccess,
  updatePushNotificationToken
};

export default connect(null, mapDispatchToProps)(AuthWait);
