import ContactScreen from './contact-screen';
import { connect } from 'react-redux';
import { getCallCenterInfo } from '@redux/thunk';

const mapDispatchToProps = {
  getCallCenterInfo
};

export default connect(null, mapDispatchToProps)(ContactScreen);
