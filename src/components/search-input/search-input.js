import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TextInput as RCTextInput,
  View,
} from 'react-native';
import {
  Text,
  Touchable
} from '@components';
import { COLOR } from '@constants';

class SearchInput extends Component {
  state = {
    text: ''
  }

  _clear = () => {
    this.textInput.clear();
    this.setState({ text: '' });
    this.props.onChangeText && this.props.onChangeText('');
  }

  render() {
    var {props, props: {icon, placeholder, showBorder}} = this;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <RCTextInput
          {...props}
          ref={(textInput) => this.textInput = textInput}
          underlineColorAndroid='transparent'
          placeholderTextColor='#8A8C99'
          style={styles.textInput}
          onChange={({nativeEvent}) => {
            this.setState({
              text: nativeEvent.text
            });
          }}/>
        {
          text ? (
            <Touchable onPress={this._clear}>
              <View style={styles.iconContainer}>
                <Image source={require('../../assets/icons/cancel-search.png')}/>
              </View>
            </Touchable>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    height: 40,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingLeft: 18
  },
  iconContainer: {
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: Platform.OS == 'android' ? -0.5 : 0,
  },
  textInput: {
    marginLeft: Platform.OS == 'android' ? -1 : 0,
    color: COLOR.TEXT_PRIMARY_2,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical : 0
  }
})

export default SearchInput;
