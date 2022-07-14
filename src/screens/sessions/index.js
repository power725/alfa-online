import SessionsScreen from './sessions-screen';
import {
    getSessions,
    closeCustomerSession,
    deleteSession,
    deleteSessionWithoutLoading
} from '@redux/thunk';
import UserActions from '@redux/actions/user.actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.user,
    sessions:state.sessions
  };
}

const mapDispatchToProps = {
  deleteSession,
  getSessions,
  closeCustomerSession,
  deleteSessionWithoutLoading,
  logout: UserActions.logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionsScreen);

