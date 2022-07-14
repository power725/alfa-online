'use strict'

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import  {
  Text
} from '@components';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

import { COLOR } from '@constants';

class Notification extends Component {
  render() {
    var {message} = this.props

    return (
      <View style={styles.container}>
        {
          Platform.OS == "ios" ?
            <StatusBar hidden/>
          : null
        }
        <View style={styles.contentContainer}>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
    paddingBottom: 10
  },
  contentContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 50,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.32)',
    paddingHorizontal: 10
  },
  textStyle: {
    fontSize: 14,
    color: 'red',
    // lineHeight: 18
  }
})

export default Notification
