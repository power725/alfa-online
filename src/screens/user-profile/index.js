import UserProfileScreen from './user-profile-screen';
import { connect } from 'react-redux';
import { updateProfile } from '@redux/thunk';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  updateProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
