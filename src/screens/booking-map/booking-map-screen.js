import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Touchable,Toast} from '@components';
import MapView, {Marker, Polyline} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import {Navigation} from 'react-native-navigation';
import _ from 'lodash';
import {getRegionForCoordinates} from '@helpers';
import styles from './booking-map-screen.style';
import I18n from '@locales';
class BookingMapScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    const {job, vehicleLocationInfo, vehiclePoints} = props;
    const jobPoints = job
      ? job.Nodes.map(Node => ({
          latitude: Node.Address.GpsLocation.Latitude,
          longitude: Node.Address.GpsLocation.Longitude,
        }))
      : [];
    const region = getRegionForCoordinates([...jobPoints, ...vehiclePoints]);

    this.state = {
      region,
      vehicleLocationInfo: vehicleLocationInfo,
      httpError:false,
      stateTimeout:0
    };
  }

  componentDidMount() {
    const {BookingId} = this.props;
    const self=this
    this.intervalHandler = setInterval(() => {
      this.props
        .getVehiclePosition(BookingId)
        .then(response => {
          if (response.data.VehicleLocationInfo) {
            this.setState({
              vehicleLocationInfo: response.data.VehicleLocationInfo,
            });
          }
        })
        .catch(error => {
          clearInterval(this.intervalHandler)
          this.setState({httpError:true})
          clearTimeout(this.state.stateTimeout)
          self.setState({
            stateTimeout:setTimeout(()=>{
              this.setState({
                httpError:false
              })
            },2000)
          })
        });
    }, 5000);
  }

  componentWillUnmount() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
  }

  _navigateToPreviousScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  startNode = null;
  finishNode = null;

  _renderMarkers({nodes, job}) {
    let nodeTypes = _.groupBy(nodes, node =>
      node.BookingId !== 0 ? 'true' : 'false',
    );
    let vehicleMarker = null;
    const {vehicleLocationInfo} = this.state;

    if (vehicleLocationInfo) {
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
          centerOffset={{
            x: 0,
            y: -20,
          }}
          coordinate={{
            latitude: vehicleLocationInfo.GpsLocation.Latitude,
            longitude: vehicleLocationInfo.GpsLocation.Longitude,
          }}
        />
      );
    }

    var customerMarkers = (nodeTypes.true || []).map((Node, index, list) => {
      let iconImage;

      if (index === 0) {
        this.startNode = Node;
        iconImage = require('../../assets/icons/pin-start.png');
      } else if (index === list.length - 1) {
        this.finishNode = Node;
        iconImage = require('../../assets/icons/pin-finish.png');
      } else {
        iconImage = require('../../assets/icons/pin-via.png');
      }

      return (
        <Marker
          fitToElements
          key={index + '' + true}
          image={iconImage}
          centerOffset={{
            x: 0,
            y: -20,
          }}
          coordinate={{
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }}
        />
      );
    });

    var otherMarkers = (nodeTypes.false || []).map((Node, index) => {
      return (
        <Marker
          fitToElements
          key={index + '' + false}
          image={require('../../assets/icons/pin-other.png')}
          centerOffset={{
            x: 0,
            y: -20,
          }}
          coordinate={{
            latitude: Node.Address.GpsLocation.Latitude,
            longitude: Node.Address.GpsLocation.Longitude,
          }}
        />
      );
    });

    return [...customerMarkers, ...otherMarkers, vehicleMarker];
  }

  _focusVehicle = () => {
    const {vehicleLocationInfo} = this.state;

    this.mapView.animateToCoordinate({
      latitude: vehicleLocationInfo.GpsLocation.Latitude,
      longitude: vehicleLocationInfo.GpsLocation.Longitude,
    });
  };

  _focusStart = () => {
    this.mapView.animateToCoordinate({
      latitude: this.startNode.Address.GpsLocation.Latitude,
      longitude: this.startNode.Address.GpsLocation.Longitude,
    });
  };

  _focusFinish = () => {
    this.mapView.animateToCoordinate({
      latitude: this.finishNode.Address.GpsLocation.Latitude,
      longitude: this.finishNode.Address.GpsLocation.Longitude,
    });
  };

  _renderButtonBar = () => {
    const {job} = this.props;

    return (
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {job.LocationInfo ? (
            <Touchable onPress={this._focusVehicle}>
              <View style={styles.button}>
                <View style={styles.buttonBorder}>
                  <Image
                    style={styles.buttonIcon}
                    source={require('../../assets/icons/car-icon.png')}
                  />
                </View>
              </View>
            </Touchable>
          ) : null}

          <Touchable onPress={this._focusStart}>
            <View style={styles.button}>
              <View style={[styles.buttonBorder, styles.buttonStartBorder]}>
                <Image
                  style={styles.pinIcon}
                  resizeMode={'contain'}
                  source={require('../../assets/icons/pin-start.png')}
                />
              </View>
            </View>
          </Touchable>

          <Touchable onPress={this._focusFinish}>
            <View style={styles.button}>
              <View style={[styles.buttonBorder, styles.buttonEndBorder]}>
                <Image
                  style={styles.pinIcon}
                  resizeMode={'contain'}
                  source={require('../../assets/icons/pin-finish.png')}
                />
              </View>
            </View>
          </Touchable>
        </View>

        <Touchable onPress={this._navigateToPreviousScreen}>
          <View style={styles.button}>
            <Image
              style={styles.buttonIcon}
              source={require('../../assets/icons/down.png')}
            />
          </View>
        </Touchable>
      </View>
    );
  };

  render() {
    const {nodes, points, job} = this.props;
    const {isMapReady, region} = this.state;
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
        <MapView
          ref={m => (this.mapView = m)}
          onMapReady={() => this.setState({isMapReady: true})}
          scrollEnabled={true}
          style={styles.map}
          showsUserLocation
          showsCompass
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
          {isMapReady ? this._renderMarkers({nodes, job}) : null}
        </MapView>
        <View pointerEvents={'none'} style={styles.buttonContainerBackground}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0)']}
            start={{x: 0.5, y: 0.0}}
            end={{x: 0.5, y: 1}}
            locations={[0, 0.8]}
            style={styles.gradient}
          />
        </View>
        {this._renderButtonBar()}
        {this.state.httpError ?  <Toast message={I18n.t('error.vehicleError')}/> : null}
      </View>
    );
  }
}

export default BookingMapScreen;
