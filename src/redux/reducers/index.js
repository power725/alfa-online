import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import AddressesReducer from './addresses.reducer';
import BookingsReducer from './bookings.reducer';
import BookingWizardReducer from './booking-wizard.reducer';
import MiscReducer from './misc.reducer';
import NotificationsReducer from './notifications.reducer';
import UserReducer from './user.reducer';
import SessionReducer from './sessions.reducer'

const config = {
  key: 'root',
  storage,
  blacklist: ['bookings', 'bookingWizard', 'misc', 'notifications']
};

const rootReducer = persistCombineReducers(config, {
  addresses:      AddressesReducer,
  bookings:       BookingsReducer,
  bookingWizard:  BookingWizardReducer,
  misc:           MiscReducer,
  notifications:  NotificationsReducer,
  user:           UserReducer,
  sessions:       SessionReducer
});

export default rootReducer;
