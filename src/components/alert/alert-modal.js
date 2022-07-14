import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Button,
  Modal,
  Text
} from '@components';
import styles from './alert-modal.style';

class AlertModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent',
    modalPresentationStyle: 'overCurrentContext'
  };

  render() {
    const {
      confirmText,
      message,
      onConfirm=()=>{},
      title
    } = this.props;

    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title={confirmText || 'Ok'}
                onPress={() => onConfirm(this.props.componentId)}/>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AlertModal;
