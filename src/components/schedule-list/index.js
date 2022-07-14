import ScheduleListComponent from './schedule-list';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isLoadingBookings: state.bookings.loading
  }
}

const ScheduleList = connect(mapStateToProps)(ScheduleListComponent);
export { ScheduleList };
