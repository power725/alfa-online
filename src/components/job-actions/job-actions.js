import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Button
} from '@components';
import styles from './job-actions.style';
import I18n from '@locales';

class JobActions extends Component {
  render() {
    const { job, onPressCancel, onPressBookReturn, onPressShowReturn, showReturn } = this.props;
    const showCancelButton = job.JobState == 'Cancelled'
                      || job.JobState == 'NoShow'
                      || job.JobState == 'Started'
                      || job.JobState == 'Finished' ? false : true;

    return (
      <View style={[styles.container, styles.row]}>
        <View style={{flex: 1.15}}>
          {
            showCancelButton ? (
              <Button
                onPress={onPressCancel}
                gradient={false}
                style={styles.button}
                title={I18n.t('button.cancel')}/>
            ) : null
          }
        </View>

        <View style={{width: 20}}/>

        <View style={{flex: 2}}>
          {
            showReturn ? (
              <Button
                onPress={onPressShowReturn}
                gradient={false}
                style={styles.buttonPositive}
                title={I18n.t('button.showReturn')}/>
            ) : (
              <Button
                onPress={onPressBookReturn}
                style={styles.button}
                title={I18n.t('button.bookReturn')}/>
            )
          }
        </View>
      </View>
    );
  }
}

export default JobActions;
