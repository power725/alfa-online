import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getNotifications: ['notifications'],
  updatePushNotification: ['pushNotification'],
  openPopup: ['popupOpen']
});

export const NotificationTypes = Types;
export const NotificationCreators = Creators;
