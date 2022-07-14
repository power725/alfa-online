import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {JobInfo, Route, VehicleInfo} from '@components';
import Placeholder from 'rn-placeholder';
import JobDetails from './job-details';
import JobActions from '../job-actions';
import MapView, {Marker, Polyline} from 'react-native-maps';
import _ from 'lodash';
import {getRegionForCoordinates} from '@helpers';
import styles from './booking-details-card.style';
import * as Animatable from 'react-native-animatable';
import {Format} from '@helpers';

class BookingDetailsCard extends Component {
  constructor(props) {
    super(props);

    const {job} = props;
    let region;

    if (job) {
      const vehiclePoints = job.LocationInfo
        ? [
            {
              latitude: job.LocationInfo.GpsLocation.Latitude,
              longitude: job.LocationInfo.GpsLocation.Longitude,
            },
          ]
        : [];
      const jobPoints = job
        ? job.Nodes.map(Node => ({
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }))
        : [];
      region = getRegionForCoordinates([...jobPoints, ...vehiclePoints]);
    }

    this.state = {
      region,
      touchIconVisible: true,
    };
  }

  componentDidMount() {
    this.timeoutHandler = setTimeout(() => {
      this.setState({touchIconVisible: false});
    }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    const {job: previousJob} = this.props;
    const {job: currentJob} = nextProps;

    if (currentJob && (!previousJob || currentJob.Id !== previousJob.Id)) {
      const {job} = nextProps;
      const vehiclePoints = job.LocationInfo
        ? [
            {
              latitude: job.LocationInfo.GpsLocation.Latitude,
              longitude: job.LocationInfo.GpsLocation.Longitude,
            },
          ]
        : [];
      const jobPoints = job
        ? job.Nodes.map(Node => ({
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }))
        : [];
      const region = getRegionForCoordinates([...jobPoints, ...vehiclePoints]);
      this.setState({region});
    }
  }

  componentWillUnmount() {
    this.timeoutHandler && clearTimeout(this.timeoutHandler);
  }

  _renderContent() {
    const {
      coTravellers,
      seatingType,
      equipments,
      job,
      timeRequested,
      job: {JobState: jobState},
      vehicleLocationInfo,
      showReturn,
      onPressCancel,
      onPressBookReturn,
      onPressShowReturn,
    } = this.props;
    var completedNodes = [];

    switch (jobState) {
      case 'Started':
      case 'Finished':
        if (jobState === 'Started') {
          completedNodes = [0];
        } else {
          completedNodes = [0, 1];
        }

        break;
    }
    let route =  job.JobType ==='CarryHelp'
                  ?  [{formattedAddress: Format.getFullAddressString(job.Nodes[0].Address)}]
                  :  job.Nodes.map(node => ({
          formattedAddress: Format.getFullAddressString(node.Address),
        }))
    return (
      <View>
        <View accessible={true} style={styles.infoTopContainer}>
          <JobInfo timeRequested={timeRequested} job={job} />
          <Route
            completedAddresses={completedNodes}
            route={route}
          />
        </View>
        <JobDetails
          seatingType={seatingType}
          coTravellers={coTravellers}
          equipments={equipments}
          job={job}
        />
        <JobActions
          onPressShowReturn={onPressShowReturn}
          onPressBookReturn={onPressBookReturn}
          onPressCancel={onPressCancel}
          showReturn={showReturn}
          job={job}
        />
        <View style={styles.spacer15} />
        <VehicleInfo vehicleLocationInfo={vehicleLocationInfo} job={job} />
      </View>
    );
  }

  _renderMarkers({nodes, job}) {
    var nodeTypes = _.groupBy(nodes, node =>
      node.BookingId !== 0 ? 'true' : 'false',
    );
    var vehicleMarker = null;
    const {vehicleLocationInfo} = this.props;

    if (job.LocationInfo) {
      let iconImage;

      switch (job.JobState) {
        case 'Unplanned':
          iconImage = null;
          break;

        case 'Planned':
          iconImage = require('../../assets/icons/pin-planned.png');
          break;

        case 'Started':
          iconImage = require('../../assets/icons/pin-started.png');
          break;

        case 'Finished':
          iconImage = require('../../assets/icons/pin-finished.png');
          break;

        case 'NoShow':
        case 'Cancelled':
          iconImage = require('../../assets/icons/pin-failed.png');
          break;
      }

      vehicleMarker = (
        <Marker
          key={'vehicle'}
          image={iconImage}
          centerOffset={{x: 0, y: -20}}
          coordinate={{
            latitude: vehicleLocationInfo.GpsLocation.Latitude,
            longitude: vehicleLocationInfo.GpsLocation.Longitude,
          }}
        />
      );
    }

    const customerMarkers = (nodeTypes.true || []).map((Node, index, list) => {
      let iconImage;

      if (index === 0) {
        iconImage = require('../../assets/icons/pin-start.png');
      } else if (index === list.length - 1) {
        iconImage = require('../../assets/icons/pin-finish.png');
      } else {
        iconImage = require('../../assets/icons/pin-via.png');
      }

      return (
        <Marker
          key={index + '' + true}
          image={iconImage}
          centerOffset={{x: 0, y: -20}}
          coordinate={{
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }}
        />
      );
    });

    const otherMarkers = (nodeTypes.false || []).map((Node, index) => {
      return (
        <Marker
          key={index + '' + false}
          image={require('../../assets/icons/pin-other.png')}
          centerOffset={{x: 0, y: -20}}
          coordinate={{
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }}
        />
      );
    });

    return [...customerMarkers, ...otherMarkers, vehicleMarker];
  }

  render() {
    const {
      job,
      loading: nextJobLoading,
      round,
      nodes,
      points,
      onPressMap,
    } = this.props;
    const {isMapReady, region, touchIconVisible} = this.state;
    const jobPoints = job
      ? job.Nodes.map(Node => ({
          latitude: Node.Address.GpsLocation.Latitude,
          longitude: Node.Address.GpsLocation.Longitude,
        }))
      : [];
    let isBefore = true;

    const groupedPoints = _.groupBy(points, point => {
      if (_.find(jobPoints, jp => _.isEqual(jp, point))) {
        isBefore = false;
        return 'jobPoints';
      } else if (isBefore) {
        return 'beforeJobPoints';
      } else {
        return 'afterJobPoints';
      }
    });

    if (groupedPoints.beforeJobPoints) {
      groupedPoints.beforeJobPoints.push(_.first(groupedPoints.jobPoints));
    } else {
      groupedPoints.beforeJobPoints = [];
    }

    if (groupedPoints.afterJobPoints) {
      groupedPoints.afterJobPoints.unshift(_.last(groupedPoints.jobPoints));
    } else {
      groupedPoints.afterJobPoints = [];
    }

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.infoContainer,
            round ? styles.borderTopRadius15 : null,
          ]}>
          <Placeholder.Paragraph
            style={styles.placeholderContainer}
            animate="fade"
            lineNumber={8}
            lineSpacing={10}
            onReady={!nextJobLoading}>
            {job ? this._renderContent() : null}
          </Placeholder.Paragraph>
        </View>
        {region ? (
          <View style={styles.mapContainer}>
            <MapView
              key={JSON.stringify(region)}
              onMapReady={() => this.setState({isMapReady: true})}
              onPress={() => onPressMap && onPressMap(job)}
              scrollEnabled={true}
              style={styles.map}
              initialRegion={region}>
              {isMapReady ? (
                <>
                  {groupedPoints.beforeJobPoints.length > 0 ? (
                    <Polyline
                      lineDashPattern={[1, 3]}
                      coordinates={groupedPoints.beforeJobPoints}
                    />
                  ) : null}
                  {groupedPoints.afterJobPoints.length > 0 ? (
                    <Polyline
                      lineDashPattern={[1, 3]}
                      coordinates={groupedPoints.afterJobPoints}
                    />
                  ) : null}
                  <Polyline
                    strokeColor={'red'}
                    strokeWidth={2}
                    lineDashPattern={[1, 3]}
                    coordinates={groupedPoints.jobPoints}
                  />
                </>
              ) : null}

              {isMapReady && job ? this._renderMarkers({nodes, job}) : null}
            </MapView>

            {touchIconVisible ? (
              <Animatable.View
                pointerEvents={'none'}
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={styles.animatedMarkerContainer}>
                <Image
                  style={styles.marker}
                  resizeMode={'contain'}
                  source={require('../../assets/icons/touch.png')}
                />
              </Animatable.View>
            ) : null}
          </View>
        ) : (
          <View style={[styles.emptyView, styles.infoContainer]} />
        )}
      </View>
    );
  }
}

export default BookingDetailsCard;
