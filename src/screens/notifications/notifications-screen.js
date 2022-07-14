import React, { Component } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  View
} from 'react-native';
import {
  Button,
  BorderButton,
  Loader,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import I18n from '@locales';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
import styles from './notifications-screen.style';
import moment from 'moment';
import _ from 'lodash';

class NotificationsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    isLoading: true,
    isRefreshing: false,
    notifications: []
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    this.props.getActorNotifications()
      .then(response => {
        const notificationIds = _.compact(_.map(response.data.Notifications, (notification) => notification.StatusEnum !== 'Confirmed' ? '' + notification.Id : null));

        if (notificationIds.length > 0)
          this.props.markNotificationsRead({ NotificationIds: notificationIds }).catch(error => { });

        this.setState({
          isLoading: false,
          isRefreshing: false,
          notifications: response.data.Notifications
        });
      })
      .catch(error => {
        this.setState({ isLoading: false, isRefreshing: false });
      });
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _openBookingDetails = (bookingId) => {
    Navigation.showModal({
      component: {
        name: 'bookingDetailsScreen',
        passProps: {
          bookingId: bookingId
        }
      }
    });
  }

  _onRefresh = () => {
    this.setState({
      isRefreshing: true
    }, this._fetchData);
  }

  _renderItem = ({item, index}) => {
    const notification = item;

    return (
      <View style={styles.notification}>
        {
          item.StatusEnum !== 'Confirmed' ? (
            <View style={styles.unreadNotificationBar}/>
          ) : null
        }
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={item.StatusEnum === 'Confirmed' ? styles.notificationTitle : styles.notificationTitleUnread}>{notification.Title || 'Title'}</Text>
          <View style={{flex: 1}}/>
          <Text style={styles.notificationTime}>{moment(notification.TimeCreated).fromNow()}</Text>
        </View>

        <View style={styles.notificationTextContainer}>
          <Text style={item.StatusEnum === 'Confirmed' ? styles.notificationText : styles.notificationTextUnread}>{notification.Body}</Text>
        </View>

        {
          item.BookingId > 0 ? (
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 1}}>
              </View>
              <View style={{flex: 1}}>
                <Button
                  onPress={() => this._openBookingDetails(item.BookingId)}
                  title={I18n.t('button.showBooking')}
                  style={styles.button}/>
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }

  _keyExtractor = (item, index) => String(item.Id)

  render() {
    const { isLoading, notifications } = this.state;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{I18n.t('notifications.title')}</Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                progressBackgroundColor={COLOR.CARD_BACKGROUND}
                tintColor={COLOR.CARD_BACKGROUND}
              />
            }
            style={{marginTop: 2}}
            contentContainerStyle={{paddingBottom: 80}}
            data={notifications}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ItemSeparatorComponent={() => <View style={{height: 2}}/>}
            />

        </View>
        <LinearGradient
          colors={COLOR.TAB_GRADIENT}
          start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1}}
          locations={[0, 0.2]}
          style={styles.tabBar}>

          <View style={styles.buttonContainer}>
            <BorderButton
              textStyle={styles.backButtonText}
              title={I18n.t('button.back')}
              onPress={this._navigateToPreviousScreen}/>
          </View>

        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default NotificationsScreen;
