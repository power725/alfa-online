import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Text,
  Touchable
} from '@components';
import styles from './border-button.style';

class BorderButton extends Component {
  render() {
    var {
      onPress,
      title,
      style,
      textStyle,
      disabled
    } = this.props;

    return (
      <Touchable
        style={{ opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        onPress={onPress}>
        <View style={[styles.container, style]}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      </Touchable>
    )
  }
}

export default BorderButton;
