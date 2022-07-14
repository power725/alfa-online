import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  TextInput,
  View,
} from 'react-native';
import styles from './sign-in-screen.style';
import {
  Button,
  Screen,
  Text
} from '@components';
import TextInputMask from 'react-native-text-input-mask';
import KeyboardManager from 'react-native-keyboard-manager';
import { Navigation } from 'react-native-navigation';
import I18n from '@locales';
import validator from 'validator';
import { debounce } from 'lodash';
import { pushScreen as pushScreenCreator } from '@helpers';
import bg from '../../assets/bg.png'
const pushScreen = pushScreenCreator();

class SignInScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#9099FA',
    orientation: 'portrait'
  }

  state = {
    code: '',
    codeValid: true,
    buttonEnabled: false
  }

  componentDidMount() {
    if (Platform.OS == 'ios')
      KeyboardManager.setKeyboardDistanceFromTextField(100);
  }

  componentWillUnmount() {
    if (Platform.OS == 'ios')
      KeyboardManager.setKeyboardDistanceFromTextField(10);
  }

  _navigateToAuthWaitScreen = () => {
    const { code } = this.state;

    pushScreen(this.props.componentId, {
      component: {
        name: 'authWait',
        passProps: {
          code
        }
      }
    });
  }

  _validate = () => {
    const { code } = this.state;
    const validation = validator.isLength(code, {min:12, max: 12});

    this.setState({ buttonEnabled: validation });
    this._validateField(validation);
  };

  _validateField = debounce((validation) => {
    this.setState({ codeValid: validation })
  }, 1500);

  render() {
    const { code, codeValid, buttonEnabled } = this.state;

    return (
      <Screen
        backgroundImage={require('../../assets/bg.png')}
        style={styles.container}
        contentContainerStyle={styles.containerContentcontainer}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode={'contain'}
              style={{width: '100%', height: 60}}
              source={require('../../assets/logo.png')}/>
          </View>

          <Text style={styles.descriptionLight}>{I18n.t('signIn.welcome')}</Text>
          <Text style={[styles.descriptionLight, styles.descriptionHeavy]}>{I18n.t('signIn.myTravels')}</Text>

          <Text style={styles.descriptionSmall}>
            {I18n.t('signIn.secondaryText')}
          </Text>

          <View style={styles.verticalSpacer}/>

          <Text style={styles.descriptionLarge}>
            {I18n.t('signIn.inputLabel')}
          </Text>

          <View style={styles.spacer17}/>

          <TextInputMask
            style={[styles.textInput, !codeValid && !buttonEnabled && styles.invalidTextInput]}
            placeholderTextColor={"grey"}
            placeholder={I18n.t('codePlaceholder')}
            mask={"[000000000000]"}
            autoCapitalize={'characters'}
            keyboardType={'numeric'}
            onChangeText={(code) => this.setState({ code }, this._validate)}/>

          {
            !codeValid && !buttonEnabled && (
              <Text style={styles.errorText}>{I18n.t('codeErrorMessage')}</Text>
            )
          }

          <View style={styles.spacer20}/>

          <Button
            disabled={!buttonEnabled}
            style={styles.button}
            title={I18n.t('button.continue')}
            onPress={this._navigateToAuthWaitScreen}/>
        </View>
      </Screen>
    );
  }
}

export default SignInScreen;
