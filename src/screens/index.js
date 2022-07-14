import { Navigation } from 'react-native-navigation';
import React from 'react';

import AddressSearchScreen from './address-search';
import AuthWait from './auth-wait';
import BookingAlternativeScreen from './booking-wizard/booking-alternative';
import BookingDropAddressScreen from './booking-wizard/booking-drop-address';
import BookingPickupAddressScreen from './booking-wizard/booking-pickup-address';
import BookingConfirmationScreen from './booking-wizard/booking-confirmation';
import BookingDetailsScreen from './booking-details';
import BookingOptionalsScreen from './booking-wizard/booking-optionals';
import BookingSummaryScreen from './booking-wizard/booking-summary';
import BookingMapScreen from './booking-map';
import BookingWizardScreen from './booking-wizard';
import ContactScreen from './contact';
import CoTravellersScreen from './co-travellers';
import DashboardScreen from './dashboard';
import DriverAssistanceScreen from './booking-wizard/driver-assistance';
import LegitimationsScreen from './booking-wizard/legitimations';
import LuggageTypeScreen from './luggage-type';
import NotificationsScreen from './notifications';
import NotificationSettingsScreen from './notification-settings';
import SeatingTypeScreen from './seating-type';
import SelectCustomerScreen from './select-customer';
import SettingsScreen from './settings';
import SignInScreen from './sign-in';
import UserAddressesScreen from './user-addresses';
import UserProfileScreen from './user-profile';
import SessionsScreen from './sessions'

import {
  AlertModal,
  ConfirmationModal,
  Notification,
  NotificationAlertModal,
  TimePicker
} from '@components';
import AddUserAddressModal from './add-user-address';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('addressSearchScreen', () => props => (
    <Provider store={store}>
      <AddressSearchScreen {...props} />
    </Provider>
  ), () => AddressSearchScreen);
  Navigation.registerComponent('authWait', () => props => (
    <Provider store={store}>
      <AuthWait {...props} />
    </Provider>
  ), () => AuthWait);
  Navigation.registerComponent('bookingAlternativeScreen', () => props => (
    <Provider store={store}>
      <BookingAlternativeScreen {...props} />
    </Provider>
  ), () => BookingAlternativeScreen);
  Navigation.registerComponent('bookingDropAddressScreen', () => props => (
    <Provider store={store}>
      <BookingDropAddressScreen {...props} />
    </Provider>
  ), () => BookingDropAddressScreen);
  Navigation.registerComponent('bookingPickupAddressScreen', () => props => (
    <Provider store={store}>
      <BookingPickupAddressScreen {...props} />
    </Provider>
  ), () => BookingPickupAddressScreen);
  Navigation.registerComponent('bookingConfirmationScreen', () => props => (
    <Provider store={store}>
      <BookingConfirmationScreen {...props} />
    </Provider>
  ), () => BookingConfirmationScreen);
  Navigation.registerComponent('bookingDetailsScreen', () => props => (
    <Provider store={store}>
      <BookingDetailsScreen {...props} />
    </Provider>
  ), () => BookingDetailsScreen);
  Navigation.registerComponent('bookingOptionalsScreen', () => props => (
    <Provider store={store}>
      <BookingOptionalsScreen {...props} />
    </Provider>
  ), () => BookingOptionalsScreen);
  Navigation.registerComponent('bookingSummaryScreen', () => props => (
    <Provider store={store}>
      <BookingSummaryScreen {...props} />
    </Provider>
  ), () => BookingSummaryScreen);
  Navigation.registerComponent('bookingMapScreen', () => props => (
    <Provider store={store}>
      <BookingMapScreen {...props} />
    </Provider>
  ), () => BookingMapScreen);
  Navigation.registerComponent('bookingWizardScreen', () => props => (
    <Provider store={store}>
      <BookingWizardScreen {...props} />
    </Provider>
  ), () => BookingWizardScreen);
  Navigation.registerComponent('contactScreen', () => props => (
    <Provider store={store}>
      <ContactScreen {...props} />
    </Provider>
  ), () => ContactScreen);
  Navigation.registerComponent('coTravellersScreen', () => props => (
    <Provider store={store}>
      <CoTravellersScreen {...props} />
    </Provider>
  ), () => CoTravellersScreen);
  Navigation.registerComponent('dashboardScreen', () => props => (
    <Provider store={store}>
      <DashboardScreen {...props} />
    </Provider>
  ), () => DashboardScreen);
  Navigation.registerComponent('driverAssistanceScreen', () => props => (
    <Provider store={store}>
      <DriverAssistanceScreen {...props} />
    </Provider>
  ), () => DriverAssistanceScreen);
  Navigation.registerComponent('luggageTypeScreen', () => props => (
    <Provider store={store}>
      <LuggageTypeScreen {...props} />
    </Provider>
  ), () => LuggageTypeScreen);
  Navigation.registerComponent('legitimationsScreen', () => props => (
    <Provider store={store}>
      <LegitimationsScreen {...props} />
    </Provider>
  ), () => LegitimationsScreen);
  Navigation.registerComponent('notificationsScreen', () => props => (
    <Provider store={store}>
      <NotificationsScreen {...props} />
    </Provider>
  ), () => NotificationsScreen);
  Navigation.registerComponent('notificationSettingsScreen', () => props => (
    <Provider store={store}>
      <NotificationSettingsScreen {...props} />
    </Provider>
  ), () => NotificationSettingsScreen);
  Navigation.registerComponent('seatingTypeScreen', () => props => (
    <Provider store={store}>
      <SeatingTypeScreen {...props} />
    </Provider>
  ), () => SeatingTypeScreen);
  Navigation.registerComponent('selectCustomerScreen', () => props => (
    <Provider store={store}>
      <SelectCustomerScreen {...props} />
    </Provider>
  ), () => SelectCustomerScreen);
  Navigation.registerComponent('settingsScreen', () => props => (
    <Provider store={store}>
      <SettingsScreen {...props} />
    </Provider>
  ), () => SettingsScreen);
  Navigation.registerComponent('signInScreen', () => props => (
    <Provider store={store}>
      <SignInScreen {...props} />
    </Provider>
  ), () => SignInScreen);
  Navigation.registerComponent('userAddressesScreen', () => props => (
    <Provider store={store}>
      <UserAddressesScreen {...props} />
    </Provider>
  ), () => UserAddressesScreen);
  Navigation.registerComponent('userProfileScreen', () => props => (
    <Provider store={store}>
      <UserProfileScreen {...props} />
    </Provider>
  ), () => UserProfileScreen);

  Navigation.registerComponent('addUserAddressModal', () => props => (
    <Provider store={store}>
      <AddUserAddressModal {...props} />
    </Provider>
  ), () => AddUserAddressModal);
  Navigation.registerComponent('alertModal', () => props => (
    <Provider store={store}>
      <AlertModal {...props} />
    </Provider>
  ), () => AlertModal);
  Navigation.registerComponent('confirmationModal', () => props => (
    <Provider store={store}>
      <ConfirmationModal {...props} />
    </Provider>
  ), () => ConfirmationModal);
  Navigation.registerComponent('notification', () => props => (
    <Provider store={store}>
      <Notification {...props} />
    </Provider>
  ), () => Notification);
  Navigation.registerComponent('notificationAlertModal', () => props => (
    <Provider store={store}>
      <NotificationAlertModal {...props} />
    </Provider>
  ), () => NotificationAlertModal);
  Navigation.registerComponent('timePicker', () => props => (
    <Provider store={store}>
      <TimePicker {...props} />
    </Provider>
  ), () => TimePicker);
    Navigation.registerComponent('sessions', () => props => (
      <Provider store={store}>
        <SessionsScreen {...props} />
      </Provider>
    ), () => SessionsScreen);
};
