import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { COLOR } from '@constants';

class Loader extends Component {
  render() {
    var {visible} = this.props;

    return !!visible && (
      <ActivityIndicator
        animating={true}
        style={styles.loader}
        size="large"
        color={COLOR.CARD_BACKGROUND}
      />
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    backgroundColor: COLOR.OVERLAY,
    ...StyleSheet.absoluteFillObject
  }
});

export default Loader;
