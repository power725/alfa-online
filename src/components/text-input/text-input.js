import React, { Component } from 'react';
import {
  Animated,
  findNodeHandle,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput as RCTextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as TextInputState from "react-native/Libraries/Components/TextInput/TextInputState";
import styles from './text-input.style';
import { debounce } from 'lodash';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      text: this.props.value,
      top: Platform.OS == 'android' ? 9 : 9,
      passwordVisibility: false,
      isValid: true
    }

    this.placeholderFontSize = new Animated.Value(this.props.value ? 12 : 16)
    this.placeholderPosition = new Animated.Value(this.props.value ? 3 : this.state.top)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.value}, this._onStateChange)
  }

  _onFocusChanged = (isFocused) => {
    this.setState({isFocused}, this._onStateChange)
  }

  _onStateChange = () => {
    Animated.parallel([
      Animated.timing(this.placeholderFontSize, {
        toValue: this.state.isFocused || this.state.text ? 12 : 16,
        duration: 200
      }),
      Animated.timing(this.placeholderPosition, {
        toValue: this.state.isFocused || this.state.text ? 3 : this.state.top,
        duration: 200
      })
    ])
    .start()
  }

  _togglePasswordVisibility = () => {
    this.setState({
      passwordVisibility: !this.state.passwordVisibility
    })
  }

  focus = () => {
    TextInputState.focusTextInput(findNodeHandle(this.input));
  }

  _validate = debounce(() => {
    this.setState({
      isValid: this.props.validation(this.state.text)
    });
  }, 500);

  render() {
    var {
      icon,
      inputStyle,
      onChangeText,
      placeholder,
      prefix,
      required,
      secureTextEntry,
      style
    } = this.props;
    var { isValid } = this.state;
    var requiredComponent = required ? (<Text style={styles.required}>{" *"}</Text>) : null

    return (
      <View
        style={[styles.container, !isValid && styles.invalidTextInput, style]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.focus}
          style={styles.contentContainer}>
          <View style={styles.inputFieldContainer}>
            {
              prefix && (this.state.isFocused || this.state.text) ?
              <View style={{paddingTop: 4.5}}>
              <Text style={[styles.inputField, inputStyle, styles.prefix]}>{prefix}</Text>
              </View>
              : null
            }
            {
              <Animated.View style={[styles.placeholderContainer, {paddingTop: this.placeholderPosition}]}>
                <Animated.Text numberOfLines={1} style={[styles.placeholder, {fontSize: this.placeholderFontSize}]}>
                  {placeholder}
                </Animated.Text>
                <Animated.Text numberOfLines={1} style={[styles.placeholder, {fontSize: this.placeholderFontSize}]}>
                  {requiredComponent}
                </Animated.Text>
              </Animated.View>
            }
            <RCTextInput
              {...this.props}
              placeholder=""
              underlineColorAndroid='transparent'
              secureTextEntry={secureTextEntry && !this.state.passwordVisibility}
              onFocus={() => this._onFocusChanged(true)}
              onBlur={() => this._onFocusChanged(false)}
              ref={(input) => { this.input = input }}
              style={[styles.inputField, inputStyle]}
              onChange={this._validate}
              onChangeText={(text) => {
                onChangeText && onChangeText(text)
                this.setState({text})
              }}
              />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TextInput;
