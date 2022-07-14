import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  Text,
  Touchable
} from '@components';
import styles from './number-picker.style'

class NumberPicker extends Component {
  static defaultProps = {
    min: 0,
    max: Number.POSITIVE_INFINITY,
    value: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    }
  }

  state = {
    value: 0
  }

  _sub = () => {
    const { min } = this.props;
    const { value } = this.state;

    if (value > min)
      this._setValue(value - 1);
  }

  _add = () => {
    const { max } = this.props;
    const { value } = this.state;

    if (value < max)
    this._setValue(this.state.value + 1);
  }

  _setValue = (value) => {
    this.setState({ value }, () => this.props.onChangeValue && this.props.onChangeValue(value));
  }

  render() {
    const { value } = this.state;
    const { min, max } = this.props;

    return (
      <View style={styles.container}>
        <Touchable style={value === min ? styles.disabled : null} disabled={value === min} onPress={this._sub}>
          <Image source={require('../../assets/icons/np-sub.png')}/>
        </Touchable>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{value}</Text>
        </View>
        <Touchable style={value === max ? styles.disabled : null} disabled={value === max} onPress={this._add}>
          <Image source={require('../../assets/icons/np-add.png')}/>
        </Touchable>
      </View>
    );
  }
}

export default NumberPicker;
