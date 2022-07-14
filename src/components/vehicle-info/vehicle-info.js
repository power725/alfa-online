import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  Text
} from '@components';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import _ from 'lodash';
import moment from 'moment';
import { Format } from '@helpers';
import I18n from '@locales';
import { point } from '@turf/helpers';
import distance from '@turf/distance';
import styles from './vehicle-info.style';

class VehicleInfo extends Component {
  render() {
    const {
      job: {
        JobState: jobState,
        VehicleInfo: vehicleInfo,
        Nodes: nodes,
      },
      vehicleLocationInfo
    } = this.props;
    const picktupTime = moment(nodes[0].TimeExecuted || undefined);
    const expectedTime = moment(nodes[1].TimeInfo.TimePlanned || undefined);
    var delayedOrExpectedTime = expectedTime;
    var timeTillEnd = picktupTime.diff(moment(), 'minutes');
    var infoTexts = [];
    var infoIcon = null;
    let jobDateTime = null;
    var cabDistance = -1;
    var showDistance = true;

    switch(jobState) {
      case 'Unplanned':
      case 'Planned':
      case 'NoShow':
      case 'Cancelled':
        var node = nodes[0];
        var destinationGeoLocation = node.Address.GpsLocation;

        if (vehicleLocationInfo && destinationGeoLocation) {
          var to = point([destinationGeoLocation.Longitude, destinationGeoLocation.Latitude]);
          var from = point([vehicleLocationInfo.GpsLocation.Longitude, vehicleLocationInfo.GpsLocation.Latitude]);
          var options = {units: 'kilometers'};
          cabDistance = distance(from, to, options).toFixed(1);
        }

        break;
      case 'Started':
      case 'Finished':
        var node = nodes[1];
        var destinationGeoLocation = node.Address.GpsLocation;

        if (vehicleLocationInfo && destinationGeoLocation) {
          var to = point([destinationGeoLocation.Longitude, destinationGeoLocation.Latitude]);
          var from = point([vehicleLocationInfo.GpsLocation.Longitude, vehicleLocationInfo.GpsLocation.Latitude]);
          var options = {units: 'kilometers'};
          cabDistance = distance(from, to, options).toFixed(1);
        }

        break;
    }

    if (nodes[0].DelayInfo) {
      var node = nodes[0];
      var d = moment(node.DelayInfo.ConfirmedDelayTime || node.DelayInfo.AutomaticDelayTime);
      const delayType = node.DelayInfo.ConfirmedDelayTime ? 'confirmed' : 'automatic';
      jobDateTime = node.TimeInfo.TimePlanned || node.TimeInfo.TimeNegotiated;
      const delayValue = d.diff(jobDateTime, 'minutes');
      delayedOrExpectedTime = expectedTime.add(delayValue, 'minutes');

      if (!vehicleArrived) {
        if (delayType == 'automatic')
          infoTexts.push(I18n.t(`dashboard.planned.vehicleAutomaticDetailDelay`) + delayValue + ' min.')
        //else
        //  infoTexts.push(I18n.t(`dashboard.planned.vehicleConfirmedDetailDelay`) + delayValue + ' min.')
      }
    }

    switch(jobState) {
      case 'Unplanned':
        infoTexts = [
          I18n.t(`dashboard.unplanned.vehicleInformation`),
          I18n.t(`dashboard.unplanned.vehicleInformationDetail`)
        ];
        infoIcon = require('../../assets/icons/no-vehicle-assigned.png');
        showDistance = false;

        break;

      case 'Planned':
        var node = nodes[0];
        jobDateTime = node.TimeInfo.TimePlanned || node.TimeInfo.TimeNegotiated;
        timeTillEnd = moment(node.TimeInfo.TimePlanned || undefined).diff(moment(), 'minutes');
        var vehicleArrived = cabDistance <= 0.05 && cabDistance >= 0 && timeTillEnd < 5;
        infoTexts = [
          I18n.t(`dashboard.planned.${ vehicleArrived ? 'vehicleArrived' : 'vehicleInformation'}`),
        ];

        if (vehicleArrived) {
          showDistance = false;
          infoIcon = require('../../assets/icons/cab-arrived.png');
        }
        else {
          showDistance = true;
          infoIcon = require('../../assets/icons/onway-status.png');
        }

        break;

      case 'Started':

        infoTexts = [
          I18n.t(`dashboard.started.vehicleInformation`),
          I18n.t(`dashboard.started.jobStarted`) + ' ' + Format.time(picktupTime),
          I18n.t(`dashboard.started.expectedArrival`) + ' ' + Format.time(delayedOrExpectedTime)
        ];
        infoIcon = require('../../assets/icons/pickup-successful.png');
        timeTillEnd = expectedTime.diff(moment(), 'minutes');
        showDistance = true;

        break;

      case 'Finished':
        infoTexts = [
          I18n.t(`dashboard.finished.vehicleInformation`),
          I18n.t(`dashboard.finished.jobStarted`) + ' ' + Format.time(picktupTime),
          I18n.t(`dashboard.finished.jobFinished`) + ' ' + Format.time(nodes[1].TimeExecuted)
        ];
        infoIcon = require('../../assets/icons/completed-job.png');
        timeTillEnd = expectedTime.diff(moment(), 'minutes');
        showDistance = false;

        break;

      case 'NoShow':
        infoTexts = [
          I18n.t(`dashboard.noshow.vehicleInformation`),
          I18n.t(`dashboard.noshow.vehicleInformationDetail`)
        ];
        infoIcon = require('../../assets/icons/failed-job.png');
        showDistance = false;

        break;

      case 'Cancelled':
        infoTexts = [
          I18n.t(`dashboard.cancelled.vehicleInformation`),
          I18n.t(`dashboard.cancelled.vehicleInformationDetail`)
        ];
        infoIcon = require('../../assets/icons/failed-job.png');
        showDistance = false;

        break;
    }

    return (
      <View style={styles.container}>
        <View accessible={true} style={styles.infoBanner}>
          {
            !! vehicleInfo ? (
              <Text style={styles.infoBannerText}>{`${vehicleInfo.VehicleManufacturer} - ${vehicleInfo.VehicleRegNbr}`}</Text>
            ) : (
              <View style={styles.infoBannerEmpty}></View>
            )
          }
        </View>

        <View accessible={true} style={styles.infoBottomContainer}>
          <View style={styles.progressContainer}>
            <View style={styles.progressCircleContainer}>
              <AnimatedCircularProgress
                size={36}
                width={4}
                fill={timeTillEnd / 60 * 100}
                rotation={0}
                tintColor="#4C69FE"
                backgroundColor="#CFD3E6" />
              <Image style={styles.progressIcon} source={infoIcon}/>
            </View>
            {
              vehicleLocationInfo && showDistance ?
                <Text style={styles.progressText}>{cabDistance}<Text style={styles.progressTextSmall}>{'km'}</Text></Text>
              :
                null
            }
          </View>

          <View style={styles.infoBottomSeparator}/>

          <View style={styles.infoBottomTextContainer}>
            <Text style={styles.infoBottomTextPrimary}>{infoTexts[0]}</Text>
            {
              _.map(infoTexts.slice(1) || [], (text, index) => !!text && (
                <Text key={index} style={styles.infoBottomTextSecondary}>{text}</Text>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
}

export default VehicleInfo;
