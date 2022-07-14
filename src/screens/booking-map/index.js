import BookingMapScreen from './booking-map-screen';
import { connect } from 'react-redux';
import {
  getVehiclePosition
} from '@redux/thunk';

const mapDispatchToProps = {
  getVehiclePosition
}

export default connect(null, mapDispatchToProps)(BookingMapScreen);
