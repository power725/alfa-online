import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  JobInfo,
  Route,
  Text,
  Touchable,
  VehicleInfo
} from '@components';
import Placeholder from 'rn-placeholder';
import styles from './job-card.style';
import I18n from '@locales';
import { Format } from '@helpers';

class JobCard extends Component {
  _renderContent() {
    const { job, timeRequested, job: { JobState: jobState } } = this.props;
    var completedNodes = [];

    switch(jobState) {
      case 'Started':
      case 'Finished':
        if (jobState == 'Started')
          completedNodes = [0];
        else
          completedNodes = [0, 1];
        break;
    }

    return (
      <View>
        <View accessible={true} style={styles.infoTopContainer}>
          <Text style={styles.label}>{jobState =='Started' ? I18n.t('placeholder.ongoingBooking') : I18n.t('placeholder.nextBooking')}</Text>
          <JobInfo
            job={job}
            timeRequested={timeRequested}/>

          <Route
            completedAddresses={completedNodes}
            route={job.Nodes.map((node) => ({
              formattedAddress: Format.getFullAddressString(node.Address),
            }))} />
        </View>

        <View style={styles.spacer15} />

        <VehicleInfo job={job}/>
      </View>
    );
  }

  render() {
    const { job, loading: nextJobLoading, onPress } = this.props;

    return (
      <Touchable disabled={!job} onPress={() => job && onPress && onPress()}>
        <View style={styles.infoContainer}>
          <Placeholder.Paragraph
            style={styles.placeholderContainer}
            animate="fade"
            lineNumber={8}
            lineSpacing={10}
            onReady={!nextJobLoading}>
            {
              job ? (
                this._renderContent()
              ) : null
            }
          </Placeholder.Paragraph>
        </View>
      </Touchable>
    );
  }
}

export default JobCard;
