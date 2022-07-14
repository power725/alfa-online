import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Modal,
  Text
} from '@components';
import styles from './confirmation-modal.style';
import I18n from '@locales';

class ConfirmationModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext'
  };

  render() {
    const {
      cancelText,
      confirmText,
      message,
      onCancel  = () => {},
      onConfirm = () => {},
      title,
      componentId
    } = this.props;

    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <BorderButton
                  title={cancelText || I18n.t('button.no')}
                  onPress={() => onCancel(componentId)}/>
              </View>
              <View style={styles.buttonSpace}/>
              <View style={styles.buttonContainer}>
                <Button
                  title={confirmText || I18n.t('button.yes')}
                  onPress={() => onConfirm(componentId)}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmationModal;
