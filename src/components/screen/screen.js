import React, {Component} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import styles from './screen.style';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';

class Screen extends Component {
  render() {
    const { children, style, contentContainerStyle, hasHeader, backgroundImage } = this.props;
    const ContainerComponent = backgroundImage ? ImageBackground : LinearGradient;
    const propsForContainer = backgroundImage ? {} : {
      start: {x: 0.5, y: 0.0},
      end: {x: 0.5, y: 1.0}
    }

    return (
      <ContainerComponent
        source={backgroundImage}
        resizeMode={'cover'}
        colors={COLOR.SCREEN_BACKGROUND_GRADIENT}
        {...propsForContainer}
        locations={[0.25, 1]}
        style={[styles.container, style]}>
        {
          Platform.OS == 'ios' && !hasHeader ? (
            <SafeAreaView style={[styles.contentContainer, contentContainerStyle]}>
              {children}
            </SafeAreaView>
          )
          : (
            <View style={[styles.contentContainer, contentContainerStyle]}>
              {children}
            </View>
          )
        }
      </ContainerComponent>
    );
  }
}

export default Screen;
