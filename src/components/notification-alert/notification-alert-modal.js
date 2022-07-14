import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Button,
  BorderButton,
  Modal,
  Text
} from '@components';
import styles from './notification-alert-modal.style';
import I18n from '@locales';

class NotificationAlertModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext'
  };

  constructor(props) {
    super(props);

    this.state = {
      unreadPushCount: 1
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifications.pushNotification !== nextProps.notifications.pushNotification) {
      this.setState({ unreadPushCount: this.state.unreadPushCount + 1 });
    }
  }

  componentWillUnmount() {
    const { notifications: { popupOpen, pushNotification }, openPopup, updatePushNotification } = this.props;

    openPopup(false);
    updatePushNotification(null);
  }

  render() {
    const {
      title,
      message,
      onPressOk,
      onPressOpenNotifications,
      notification,
      notifications: { pushNotification, unreadNotificationIds }
    } = this.props;
    const { unreadPushCount } = this.state;

    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{pushNotification && notification.notificationId !== pushNotification.notificationId ? I18n.t('pushNotification.title') : title}</Text>
            <Text style={styles.message}>{pushNotification && notification.notificationId !== pushNotification.notificationId ? `${I18n.t('pushNotification.messageYouHave')} ${unreadNotificationIds.length + unreadPushCount} ${I18n.t('pushNotification.message')}`: message}</Text>
            <View style={styles.buttonsRow}>
              <View style={styles.buttonContainer}>
                <BorderButton
                  title={I18n.t('button.close')}
                  onPress={() => onPressOk(this.props.componentId)}/>
              </View>

              <View style={{width: 10}}/>

              <View style={styles.buttonContainer}>
                <Button
                  title={I18n.t('button.showAll')}
                  onPress={() => onPressOpenNotifications(this.props.componentId)}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default NotificationAlertModal;
