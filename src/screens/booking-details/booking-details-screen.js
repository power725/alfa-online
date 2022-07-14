import React, {Component} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {
  BookingTabBar,
  BookingDetailsCard,
  Loader,
  Screen,
  Touchable,
  Toast
} from '@components';
import {Navigation} from 'react-native-navigation';
import styles from './booking-details-screen.style';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import _ from 'lodash';
import moment from 'moment';
import I18n from '@locales';
import Analytics from '../../helpers/analytics';
import {
  getRegionForCoordinates,
  pushScreen as pushScreenCreator,
} from '@helpers';
const pushScreen = pushScreenCreator();

class BookingDetailsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      nodes: [],
      points: [],
      region: null,
      booking: null,
      vehicleLocationInfo: null,
      httpError:false,
      stateTimeout:0
    };
  }

  componentDidMount() {
    const {bookingId: BookingId, getBooking, getRouteNodes} = this.props;
    const self = this
    const bookingParams = {
      GetLegitimation: true,
    };

    Promise.all([
      getBooking(BookingId, bookingParams),
      getRouteNodes(BookingId),
    ])
      .then(responses => {
        const bookingResponse = responses[0];
        const routeResponse = responses[1];
        const points = routeResponse.data.Nodes.map(Node => ({
          latitude: Node.Address.GpsLocation.Latitude,
          longitude: Node.Address.GpsLocation.Longitude,
        }));
        const region = getRegionForCoordinates(points);
        const booking = bookingResponse.data.Booking;
        const pickupTimeInfo = booking.PickupTimeInfo;
        const pickupTime = moment(
          pickupTimeInfo.TimePlanned || pickupTimeInfo.TimeNegotiated,
        );
        const dropTime = moment(booking.TimeDropEstimated);
        const currentTime = moment();

        if (
            (pickupTime
                    .clone()
                    .subtract(15, 'minutes')
                    .isSameOrBefore(currentTime) &&
                pickupTime.isSameOrAfter(currentTime)) ||
            (pickupTime.isSameOrBefore(currentTime) &&
                dropTime.isSameOrAfter(currentTime))
        ) {
          this.intervalHandler = setInterval(() => {
            this.props
              .getVehiclePosition(booking.Id)
              .then(response => {
                if (response.data.VehicleLocationInfo) {
                  this.setState({
                    vehicleLocationInfo: response.data.VehicleLocationInfo,
                  });
                }
              })
              .catch(() => {
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
          }, 10000);
        }

        this.setState({
          vehicleLocationInfo: booking.Jobs[0].LocationInfo,
          booking: bookingResponse.data.Booking,
          isLoading: false,
          nodes: routeResponse.data.Nodes,
          points,
          region,
        });
      })
      .catch(error => {
        this._navigateToPreviousScreen();
        this.setState({isLoading: false});
      });
  }

  componentWillUnmount() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
  }

  _navigateToPreviousScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  _openBookingMap = job => {
    const {nodes, points, vehicleLocationInfo} = this.state;
    let vehiclePoints = [];

    if (vehicleLocationInfo) {
      vehiclePoints = [
        {
          latitude: vehicleLocationInfo.GpsLocation.Latitude,
          longitude: vehicleLocationInfo.GpsLocation.Longitude,
        },
      ];
    }

    Navigation.showModal({
      component: {
        name: 'bookingMapScreen',
        passProps: {
          BookingId: job.BookingId,
          nodes,
          points,
          job,
          vehicleLocationInfo,
          vehiclePoints,
        },
      },
    });
  };

  _cancelBooking = () => {
    const {cancelBooking, onCancelBooking} = this.props;
    const {booking} = this.state;
    Analytics.trackWithProperties('Cancel Booking', {bookingId: booking.Id});

    Navigation.showOverlay({
      component: {
        name: 'confirmationModal',
        animationType: 'none',
        passProps: {
          title: I18n.t('cancel.title'),
          message: I18n.t('cancel.cancelBooking'),
          onCancel: componentId => Navigation.dismissOverlay(componentId),
          onConfirm: componentId => {
            Navigation.dismissOverlay(componentId);
            this.setState({isProcessing: true});

            cancelBooking(booking.Id)
              .then(response => {
                onCancelBooking && onCancelBooking();

                const updatedBooking = {
                  ...booking,
                  BookingState: 'Cancelled',
                  Jobs: booking.Jobs.map(job => ({
                    ...job,
                    JobState: 'Cancelled',
                  })),
                };

                this.setState({
                  booking: updatedBooking,
                  isProcessing: false,
                });
                Navigation.dismissModal(this.props.componentId);
              })
              .catch(error => {
                let title = I18n.t('error.modalTitle');

                if (error.response.status === 409) {
                  title = I18n.t('error.conflictTitle');
                }

                Navigation.showOverlay({
                  component: {
                    name: 'alertModal',
                    animationType: 'none',
                    passProps: {
                      title: title,
                      animationType: 'none',
                      message: error.response.data.ResponseStatus.Message,
                      onConfirm: cId => Navigation.dismissOverlay(cId),
                    },
                  },
                });

                this.setState({isProcessing: false});
              });
          },
        },
      },
    });
  };

  _bookReturn = (j) => {
    Analytics.track('Return Booking');
    const {booking} = this.state;
    let coTravellers, equipments;
    if (booking.CoTravellers.length > 0) {
      coTravellers = new Map();
      _.each(booking.Legitimation.AllowedCoTravellers, coTraveller =>
        coTravellers.set(coTraveller.Key.Id, 0),
      );
      _.each(booking.CoTravellers, coTraveller =>
        coTravellers.set(coTraveller.Key.Id, coTraveller.Value),
      );
    }

    if (booking.Equipments.length > 0) {
      equipments = new Map();
      _.each(booking.Legitimation.AllowedEquipment, equipment =>
        equipments.set(equipment.Key.Id, 0),
      );
      _.each(booking.Equipments, equipment =>
        equipments.set(equipment.Key.Id, equipment.Value),
      );
    }

    const bookingWizard = {
      timeWanted: null,
      timeType: null,
      legitimation: booking.Legitimation,
      pickupAddress: booking.AddressEnd,
      dropAddress: booking.AddressStart,
      ticketType: booking.TicketType.Code,
      seatingType: booking.SeatingType,
      assistancePickup: booking.AssistanceFrom,
      assistanceDrop: booking.AssistanceTo,
      coTravellers: coTravellers,
      equipment: equipments,
      editMode: false,
      findBooking: false,
      isReturn: true,
      reqTime:booking.RequestedTime,
      pickupTimeInfo:booking.PickupTimeInfo
    };
    this.props.updateBookingWizard(bookingWizard);

    pushScreen(this.props.componentId, {
      component: {
        name: 'bookingWizardScreen',
        passProps: {
          editMode: true,
          onEditComplete: componentId => {
            this.props.updateBookingWizard({
              editMode: false,
              findBooking: true,
            });
            pushScreen(componentId, {
              component: {
                name: 'bookingSummaryScreen',
              },
            });
          },
        },
      },
    });
  };

  _showReturn = () => {
    const {booking} = this.state;
    const BookingId = booking.ReturnBookingId;

    Navigation.showModal({
      component: {
        name: 'bookingDetailsScreen',
        passProps: {
          bookingId: BookingId,
          onCancelBooking: this._fetchData,
        },
      },
    });
  };

  _renderBooking(booking, nodes, points) {
    const {job: jobTapped} = this.props;
    const tappedJobIndex = jobTapped
      ? _.findIndex(booking.Jobs, j => j.Id === jobTapped.Id)
      : -1;

    return booking.Jobs.length > 1 ? (
      <ScrollableTabView
        initialPage={tappedJobIndex}
        prerenderingSiblingsNumber={3}
        renderTabBar={() => <BookingTabBar nodes={nodes} />}>
        {_.map(booking.Jobs, (job, index, list) => {
          return (
            <View style={styles.bookingContainer} key={index} tabLabel={job}>
              <BookingDetailsCard
                onPressCancel={this._cancelBooking}
                onPressBookReturn={()=>this._bookReturn()}
                onPressShowReturn={this._showReturn}
                onPressClose={this._navigateToPreviousScreen}
                onPressMap={this._openBookingMap}
                showReturn={booking.ReturnBookingId > 0}
                seatingType={booking.SeatingType}
                coTravellers={booking.CoTravellers}
                equipments={booking.Equipments}
                nodes={nodes}
                points={points}
                timeRequested={booking.RequestedTime}
                job={job}
                vehicleLocationInfo={this.state.vehicleLocationInfo}
              />
            </View>
          );
        })}
      </ScrollableTabView>
    ) : (
      <View style={styles.bookingContainer}>
        <BookingDetailsCard
          round
          onPressCancel={this._cancelBooking}
          onPressBookReturn={()=>this._bookReturn()}
          onPressShowReturn={this._showReturn}
          onPressClose={this._navigateToPreviousScreen}
          onPressMap={this._openBookingMap}
          showReturn={booking.ReturnBookingId > 0}
          seatingType={booking.SeatingType}
          coTravellers={booking.CoTravellers}
          equipments={booking.Equipments}
          nodes={nodes}
          points={points}
          timeRequested={booking.RequestedTime}
          job={booking.Jobs[0]}
          vehicleLocationInfo={this.state.vehicleLocationInfo}
        />
      </View>
    );
  }

  render() {
    const {booking, isLoading, isProcessing, nodes, points} = this.state;
    return (
      <Screen>
        <ScrollView
          contentContainerStyle={styles.bodyContentContainer}
          style={styles.body}>
          <Touchable
            accessible={true}
            accessibilityLabel={I18n.t('button.close')}
            style={styles.closeButton}
            onPress={this._navigateToPreviousScreen}>
            <Image source={require('../../assets/icons/close-modal.png')} />
          </Touchable>
          {booking ? (
            this._renderBooking(booking, nodes, points)
          ) : (
            <BookingDetailsCard
              round
              nodes={nodes}
              points={points}
              job={null}
              loading={isLoading}
            />
          )}
          {this.state.httpError ?  <Toast message={I18n.t('error.vehicleError')}/> : null}
        </ScrollView>
        <Loader visible={isProcessing} />
      </Screen>
    );
  }
}

export default BookingDetailsScreen;
