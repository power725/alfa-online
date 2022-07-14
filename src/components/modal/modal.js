import React, { Component } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './modal.style';

class Modal extends Component {
  render() {
    const { children, style, contentContainer } = this.props;

    return (
      <Animatable.View
        animation={'fadeIn'}
        duration={300}
        useNativeDriver
        style={[styles.container, style]}>
        {
          Platform.OS === 'ios' ? (
            <Animatable.View
              animation={'fadeInUpBig'}
              duration={300}
              easing={'ease-out'}
              useNativeDriver
              style={styles.contentContainer}>
              <SafeAreaView style={[styles.contentContainer, contentContainer]}>
                {children}
              </SafeAreaView>
            </Animatable.View>
          ) : (
            <Animatable.View
              animation={'fadeInUpBig'}
              duration={300}
              easing={'ease-out'}
              useNativeDriver
              style={[styles.contentContainer, contentContainer]}>
              {children}
            </Animatable.View>
          )
        }
      </Animatable.View>
    );
  }
}

export default Modal;
