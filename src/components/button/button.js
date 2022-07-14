import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Text,
  Touchable
} from '@components';
import styles from './button.style';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';

class Button extends Component {
  static defaultProps = {
    gradient: true
  }

  render() {
    var {
      onPress,
      title,
      style,
      disabled,
      gradient
    } = this.props;

    return (
      <Touchable
        style={{ opacity: disabled ? 0.5 : 1 }}
        disabled={disabled}
        onPress={onPress}>
        <LinearGradient
          colors={gradient ? COLOR.BUTTON_GRADIENT : COLOR.BUTTON_NO_GRADIENT}
          start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
          locations={[0, 0.5]}
          style={[styles.container, style]}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </Touchable>
    )
  }
}

export default Button;
