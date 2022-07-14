import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  Button,
  Text
} from '@components';
import styles from './retry-card.style';

class RetryCard extends Component {
  render() {
    const { onPressRetry } = this.props;

    return (
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>{'Unable to connect'}</Text>
        <View style={styles.contentContainer}>
          <Image style={styles.icon} resizeMode={'contain'} source={require('../../../assets/icons/no-connection.png')}/>
          <Button onPress={onPressRetry} style={styles.button} title={'Retry'}/>
        </View>
      </View>
    );
  }
}

export default RetryCard;
