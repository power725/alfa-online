import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text} from '@components';
import moment from 'moment';
import {Format} from '@helpers';
import styles from './job-info.style';
import I18n from '@locales';

class JobInfo extends Component {
  _renderRequestTime (jobTimeType,timeType,timeRequested) {
    if(this.props.job.JobType ==='CarryHelp'){
      return  <Text style={styles.timeType}>
        {I18n.t('placeholder.carryingAssistance')}
      </Text>
    }
    return jobTimeType ? (
        <Text style={styles.timeType}>
          {I18n.t('placeholder.requestedTimeTitle')}: {timeType}{' '}
          {Format.time(timeRequested)}
        </Text>
    ) : null
  }
  render() {
    const {
      job: {JobState: jobState, Nodes: nodes},
      timeRequested,
    } = this.props;
    var jobDate,
      jobTime,
      jobTimeType,
      dateAfterDelay,
      timeAfterDelay,
      delayType,
      jobDateTime,
      node,
      timeFlexEnd;
    var delayValue = '';

    // 2019-02-03 TE: We instead always keep the timeplanned for pickup
    jobDateTime =
      nodes[0].TimeInfo.TimePlanned || nodes[0].TimeInfo.TimeNegotiated;
    jobDate = Format.calendar(jobDateTime);
    jobTime = Format.time(jobDateTime);
    timeFlexEnd = nodes[0].TimeInfo.TimeFlexEnd;

    if (nodes[0].DelayInfo) {
      var node = nodes[0];
      var d = moment(
        node.DelayInfo.ConfirmedDelayTime || node.DelayInfo.AutomaticDelayTime,
      );
      delayValue = d.diff(jobDateTime, 'minutes');
      delayType = node.DelayInfo.ConfirmedDelayTime ? 'confirmed' : 'automatic';
      dateAfterDelay = Format.calendar(d);
      timeAfterDelay = Format.time(d);
    }

    switch (jobState) {
      case 'Unplanned':
        delayValue = 'Preliminary';
        // node = nodes[0];
        // jobDate = Format.calendar(node.TimeInfo.TimeNegotiated);
        // jobTime = Format.time(node.TimeInfo.TimeNegotiated);
        break;

      case 'Planned':
        // node = nodes[0];
        // jobDateTime = node.TimeInfo.TimePlanned || node.TimeInfo.TimeNegotiated;
        // jobDate = Format.calendar(jobDateTime);
        // jobTime = Format.time(jobDateTime);

        break;

      case 'Started':
        // node = nodes[0]; // TE: take first node instead of second AO-299
        // jobDateTime = node.TimeInfo.TimePlanned || node.TimeInfo.TimeNegotiated;
        // jobDate = Format.calendar(jobDateTime);
        // jobTime = Format.time(jobDateTime);

        break;

      case 'Finished':
        // node = nodes[1];

        break;

      case 'NoShow':
        // node = nodes[0];
        // jobDateTime = node.TimeInfo.TimePlanned || node.TimeInfo.TimeNegotiated;
        // jobDate = Format.calendar(jobDateTime);
        // jobTime = Format.time(jobDateTime);

        break;

      case 'Cancelled':
        // node = nodes[0];
        // jobDateTime = node.TimeInfo.TimeNegotiated;
        // jobDate = Format.calendar(jobDateTime);
        // jobTime = Format.time(jobDateTime);

        break;
    }

    node = nodes[0];
    jobTimeType = node.TimeType;

    // sometimes, the timetype is on the last node. We should look at Booking, but we dont have access to that now.
    if (jobTimeType === 'Undefined') {
      jobTimeType = nodes[nodes.length - 1].TimeType;
    }

    let timeType;

    switch (jobTimeType) {
      case 'ArrivalLatest':
        timeType = I18n.t('bookingWizard.dateTime.arrivalLatest');
        break;

      case 'DepartureAround':
        timeType = I18n.t('bookingWizard.dateTime.departureAround');
        break;

      case 'DepartureEarliest':
        timeType = I18n.t('bookingWizard.dateTime.departureEarliest');
        break;
    }

    return (
      <View>
        {this._renderRequestTime(jobTimeType,timeType,timeRequested)}
        <View style={styles.row}>
          <View style={[styles.infoTitleContainer, styles.flexShrink1]}>
            <Text
              style={[
                delayType &&
                  delayType === 'confirmed' &&
                  jobDate !== dateAfterDelay &&
                  styles.strikeThrough,
                styles.infoTitle,
              ]}
              numberOfLines={2}>
              {jobDate === 'Invalid date' ? 'Unavailable' : jobDate + ' '}
              {jobTime === 'Invalid date' ? null : (
                <Text
                  style={[
                    delayType &&
                      delayType === 'confirmed' &&
                      styles.strikeThrough,
                    styles.infoTitle,
                  ]}>
                  {jobTime}{' '}
                </Text>
              )}
              {!(
                delayType &&
                delayType === 'confirmed' &&
                jobDate !== dateAfterDelay
              ) &&
              delayType &&
              delayType === 'confirmed' ? (
                <Text style={styles.delay}>{timeAfterDelay}</Text>
              ) : null}
            </Text>
          </View>
          {delayType && delayType === 'automatic' && (
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>
                {typeof delayValue === 'string'
                  ? delayValue
                  : delayValue > 0
                  ? '+' + delayValue
                  : 'On time'}
              </Text>
            </View>
          )}
        </View>

        {
          delayType && delayType === 'confirmed' && jobDate != dateAfterDelay && (
            <View style={[styles.infoTitleContainer, { marginTop: -24 }]}>
              <Text style={styles.delay}>{ dateAfterDelay } { timeAfterDelay }</Text>
            </View>
          )
        }
        {
          delayType && delayType === 'confirmed' && (
            <View style={[styles.row, { marginTop: -10 }]}>
              <Image style={{marginTop: 0.5}} source={require('../../assets/icons/delay-alert.png')}/>
              <Text style={styles.delaySmall}>{ I18n.t('dashboard.planned.vehicleConfirmedDetailDelay')} {delayValue} min</Text>
            </View>
          )
        }
        {
          timeFlexEnd && moment().isBefore(timeFlexEnd) ? (
            <View style={[styles.row, { marginTop: -10 }]}>
              <Text style={styles.timeType}>{I18n.t('bookingWizard.summary.flexibleTime')} {` ${Format.date(timeFlexEnd, 'dddd, DD MMMM [kl] HH:mm')}`}</Text>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default JobInfo;
