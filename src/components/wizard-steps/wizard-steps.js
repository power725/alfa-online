import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Text
} from '@components';
import styles from './wizard-steps.style';

class WizardSteps extends Component {
  static defaultProps = {
    step: 1
  }

  render() {
    const { step } = this.props;

    return (
      <View style={styles.stepBar}>
        <View style={[styles.step, step >= 1 && styles.stepDone]}>
          <Text style={styles.stepText}>{'1'}</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={[styles.step, step >= 2 && styles.stepDone]}>
          <Text style={styles.stepText}>{'2'}</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={[styles.step, step >= 3 && styles.stepDone]}>
          <Text style={styles.stepText}>{'3'}</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={[styles.step, step >= 4 && styles.stepDone]}>
          <Text style={styles.stepText}>{'4'}</Text>
        </View>

        <View style={styles.stepLine}/>

        <View style={[styles.step, step >= 5 && styles.stepDone]}>
          <Text style={styles.stepText}>{'5'}</Text>
        </View>
      </View>
    );
  }
}

export default WizardSteps
