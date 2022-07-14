import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Screen,
  Text,
  Touchable
} from '@components';
import styles from './booking-alternative-screen.style';
import ViewOverflow from 'react-native-view-overflow';
import moment from 'moment';
import I18n from '@locales';
import { Format } from '@helpers';

class BookingAlternativeScreen extends Component {
  _alternativeText = () => {
    const { originalBooking: { TimeWanted }, alternativeEarlyTime, alternativeLateTime } = this.props;
    const originalBookingTimeComponent = <Text style={styles.descriptionBold}>{Format.dateTime(TimeWanted, 'HH:mm')}</Text>;
    const altEarlyTimeComponent = alternativeEarlyTime ? <Text style={styles.descriptionBold}>{Format.dateTime(alternativeEarlyTime, 'HH:mm')}</Text> : null;
    const altLateTimeComponent = alternativeLateTime ? <Text style={styles.descriptionBold}>{Format.dateTime(alternativeLateTime, 'HH:mm')}</Text> : null;

    if (alternativeLateTime && alternativeEarlyTime)
      return <Text style={styles.description}>{'\n\n' + I18n.t('bookingWizard.alternative.bestBefore')} {originalBookingTimeComponent} { I18n.t('placeholder.is') } {altEarlyTimeComponent} {I18n.t('bookingWizard.alternative.bestAfter2')} {altLateTimeComponent}</Text>;
    else if (!alternativeLateTime && alternativeEarlyTime)
      return <Text style={styles.description}>{'\n\n' + I18n.t('bookingWizard.alternative.bestBefore')} {originalBookingTimeComponent} { I18n.t('placeholder.is') } {altEarlyTimeComponent}</Text>;
    else if (alternativeLateTime && !alternativeEarlyTime)
      return <Text style={styles.description}>{'\n\n' + I18n.t('bookingWizard.alternative.bestAfter')} {originalBookingTimeComponent} { I18n.t('placeholder.is') } {altLateTimeComponent}</Text>;
    else
      return null;
  }

  _renderAlternativeButtons = () => {
    const { originalBooking: { TimeWanted }, alternativeEarlyTime, alternativeLateTime, onPressAlternative } = this.props;

    if (alternativeLateTime && alternativeEarlyTime) {
      return (
        <View>
          <Button
            onPress={() => onPressAlternative && onPressAlternative(alternativeLateTime)}
            style={{width: 250}}
            title={`${I18n.t('placeholder.choose')} ${Format.dateTime(alternativeLateTime, 'HH:mm')}`}/>
          <View style={{height: 10}}/>
          <Button
            onPress={() => onPressAlternative && onPressAlternative(alternativeEarlyTime)}
            style={{width: 250}}
            title={`${I18n.t('placeholder.choose')} ${Format.dateTime(alternativeEarlyTime, 'HH:mm')}`}/>
          <View style={{height: 40}}/>
        </View>
      );
    }
    else if (!alternativeLateTime && alternativeEarlyTime) {
      return (
        <View>
          <Button
            onPress={() => onPressAlternative && onPressAlternative(alternativeEarlyTime)}
            style={{width: 250}}
            title={`${I18n.t('placeholder.choose')} ${Format.dateTime(alternativeEarlyTime, 'HH:mm')}`}/>
          <View style={{height: 40}}/>
        </View>
      );
    }
    else if (alternativeLateTime && !alternativeEarlyTime) {
      return (
        <View>
          <Button
            onPress={() => onPressAlternative && onPressAlternative(alternativeLateTime)}
            style={{width: 250}}
            title={`${I18n.t('placeholder.choose')} ${Format.dateTime(alternativeLateTime, 'HH:mm')}`}/>
          <View style={{height: 40}}/>
        </View>
      );
    }
    else
      return null;

  }

  render() {
    const title = I18n.t('bookingWizard.alternative.title') + '!';
    const { originalBooking: { TimeWanted, TimeType } } = this.props;
    const alternativeText = this._alternativeText();
    const isToday = moment(TimeWanted).isSame(moment(), 'day');
    const originalBookingTimeComponent = <Text style={styles.descriptionBold}>{Format.dateTime(moment(TimeWanted), isToday ? 'HH:mm' : 'dddd, DD MMMM HH:mm')}</Text>;
    let timeType;

    switch(TimeType) {
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
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../../assets/icons/error-modal.png')}/>
            </ViewOverflow>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>

            <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 10, alignItems: 'center'}}>
              <Text style={styles.description}>{I18n.t('bookingWizard.alternative.notFound')} {timeType} {originalBookingTimeComponent}</Text>
              {alternativeText}
              <View style={{height: 25}}/>

              { this._renderAlternativeButtons() }

              <BorderButton
                onPress={this.props.onPressEditDateTime}
                style={{width: 250}}
                title={I18n.t('button.backToTimeSelection')}/>

              <View style={{height: 10}}/>

              <Button
                onPress={this.props.onPressCancelBooking}
                gradient={false}
                style={[{width: 250}, styles.buttonNegative]}
                title={I18n.t('button.cancelBooking')}/>
            </ScrollView>
          </View>
        </View>
      </Screen>
    );
  }
}

export default BookingAlternativeScreen;
