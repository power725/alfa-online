import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text, Touchable} from '@components';
import styles from './schedule-list.style';
import moment from 'moment';
import {Format} from '@helpers';
import _ from 'lodash';
import ScheduleListItem from './schedule-list-item';
import I18n from '@locales';

class ScheduleList extends Component {
  _renderItem({item, index}) {
    const {onPressItem, isLoadingBookings, fetchingData} = this.props;
    return (
      <ScheduleListItem
        key={index}
        booking={item}
        onPressItem={onPressItem}
        isLoadingBookings={isLoadingBookings}
        fetchingData={fetchingData}
      />
    );
  }

  render() {
    const {dateBookings} = this.props;
    return (
      <View style={styles.container}>
        {dateBookings.map((dateBooking, index) => {
          const {bookings, date} = dateBooking;
          const isToday = moment(date).isSame(moment(), 'day');
          const isBeforeToday = moment(date).isBefore(moment(), 'day');

          return (
            <View key={index} style={styles.contentContainer}>
              <View style={[styles.header, isToday && styles.headerToday]}>
                <View
                  accessible={true}
                  accessibilityLabel={Format.date(
                    date,
                    isToday
                      ? `[${I18n.t('placeholder.today')}], dddd DD MMMM`
                      : 'dddd DD MMMM',
                  )}
                  style={styles.headerContenrContainer}>
                  <Text style={styles.headerText}>
                    {Format.date(
                      date,
                      isToday
                        ? `[${I18n.t('placeholder.today')}], ddd`
                        : 'dddd',
                    )}
                  </Text>
                  <Text
                    style={[styles.headerTextSecondLine, styles.headerText]}>
                    {Format.date(date, 'DD MMMM')}
                  </Text>
                </View>
                {!isBeforeToday && (
                  <Touchable
                    onPress={() => {
                      this.props.onPressAddBooking &&
                        this.props.onPressAddBooking(date);
                    }}>
                    <Image
                      accessible={true}
                      accessibilityLabel={`${I18n.t(
                        'dashboard.calendar.createBookingOn',
                      )} ${Format.date(date, 'dddd DD MMMM')}`}
                      source={require('../../assets/icons/schedule-add.png')}
                    />
                  </Touchable>
                )}
              </View>
              <View style={styles.list}>
                {_.map(bookings, (booking, bookingIndex) => {
                  return (
                    <View accessible={true} key={bookingIndex}>
                      <View style={styles.separator}/>
                      {this._renderItem({item: booking, index})}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default ScheduleList;
