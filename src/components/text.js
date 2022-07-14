import React, {Component} from 'react';
import {
  StyleSheet,
  Text as RCText
} from 'react-native';
import {FontHelper} from '@helpers';
import _ from 'lodash';

class Text extends Component {
  render() {
    var {children, style} = this.props;

    if (style instanceof Array)
      style = _.map(style, (styleObject) => styleObject && FontHelper(StyleSheet.flatten(styleObject)));
    else
      style = FontHelper(StyleSheet.flatten(style || {}));

    return (
      <RCText
        {...this.props}
        style={style}>
        {children}
      </RCText>
    );
  }
}

export {Text};
