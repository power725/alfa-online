import { createReducer } from 'reduxsauce'
import { NotificationTypes as Types, UserTypes } from '../actions';
import storeInitialState from '../store/initial-state';

export const INITIAL_STATE = storeInitialState.notifications;

export const getNotifications = (state, action) => {
  const { notifications } = action;
  const unreadNotificationIds = _.compact(_.map(notifications, (notification) => notification.StatusEnum !== 'Confirmed' ? notification.Id : null));

  return {
    data: notifications,
    unreadNotificationIds,
    loading: false
  };
}

export const openPopup = (state, action) => ({ ...state, popupOpen: action.popupOpen})

export const updatePushNotification = (state, action) => {
  const { pushNotification } = action;

  return {
    ...state,
    pushNotification
  };
}

logout = (state, action) => INITIAL_STATE

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.GET_NOTIFICATIONS]:          getNotifications,
  [Types.OPEN_POPUP]:                 openPopup,
  [Types.UPDATE_PUSH_NOTIFICATION]:   updatePushNotification,
  [UserTypes.LOGOUT]:                 logout,
}

export default createReducer(INITIAL_STATE, HANDLERS);
