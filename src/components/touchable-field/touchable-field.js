import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import {
  Text
} from '@components';
import _ from 'lodash';
import {Touchable} from '@components';
import {COLOR} from '@constants';

class TouchableField extends Component {
  render() {
    var {disabled, placeholder, required, value} = this.props;
    var requiredComponent = required ? (<Text style={styles.required}>{" *"}</Text>) : null;
    placeholder = placeholder || '';

    return (
      <Touchable disabled={disabled} onPress={this.props.onPress}>
        <View
          style={[styles.container, this.props.style, disabled && styles.disabled]}>
          {
            /*disabled ?
            <View style={[styles.disabledOverlay]}/>
            : null*/
          }
          <View style={styles.contentContainer}>
            {
              value ?
              <View style={styles.flexContainer}>
                <Text style={[styles.placeholder, styles.placeholderTextColor]}>{this.props.placeholder}{requiredComponent}</Text>
                <Text numberOfLines={1} style={[styles.value, this.props.textStyle]}>{value}</Text>
              </View>
              :
              <View style={styles.flexContainer}>
                <Text style={[styles.value, styles.placeholderTextColor, this.props.textStyle]}>{placeholder}{requiredComponent}</Text>
              </View>
            }
            {typeof this.props.icon != "undefined" ? this.props.icon : <Image style={{tintColor: '#A4A8CD'}} source={require('../../assets/icons/chevron.png')}/>}
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 5,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 16.96,
    paddingVertical: 5,
    minHeight: 56,
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.4
  },
  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.TRANSPARENT
  },
  flexContainer: {
    flex: 1,
    marginRight: 5,
  },
  placeholder: {
    marginBottom: -7,
    fontSize: 12,
    fontWeight: '400'
  },
  placeholderTextColor: {
    color: COLOR.TEXT_PLACEHOLDER
  },
  required: {
    color: COLOR.WARNING
  },
  value: {
    fontSize: 16,
    // marginTop: -6,
    color: COLOR.TEXT_PRIMARY_2,
  }
});

export default TouchableField;
