import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View
} from 'react-native';
import {
  Button,
  BorderButton,
  Screen,
  Text,
  Touchable,
  WizardSteps
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './booking-wizard-screen.style';
import { Format, Notification, pushScreen as pushScreenCreator } from '@helpers';
import Analytics from '../../helpers/analytics';
import Collapsible from 'react-native-collapsible';
import I18n from '@locales';
import moment from 'moment';
import timeZoneMoment from 'moment-timezone'
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
const pushScreen = pushScreenCreator();

class BookingWizardScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);
    Analytics.track('Booking Wizard Time Selection');

    this.currentDate = moment();
    const { bookingWizard, date } = props;
    var timeWanted = bookingWizard.timeWanted || date;
    let dateSelection = 0;

    if (timeWanted) {
      if (moment(timeWanted).isSame(moment(), 'day'))
        dateSelection = 1;
      else if (moment(timeWanted).isSame(moment(this.currentDate).add(1, 'days')))
        dateSelection = 2;
      else
        dateSelection = 3;
    }
    else {
      if (bookingWizard.timeType === 'DepartureAround') {
        dateSelection = 1;
        timeWanted = this.currentDate;
      }
    }

    this.state = {
      dateSelection,
      TimeType: bookingWizard.timeType,
      selectedDate: timeWanted ? moment(timeWanted) : null,
      selectedTime: timeWanted ? moment(timeWanted) : null
    }
  }

  _navigateToPreviousScreen = () => {
    const { commandType } = this.props;
      this.props.resetBookingWizard()

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _continue = () => {
    const { selectedDate, selectedTime, TimeType } = this.state;
    let TimeWanted = null;

    if (selectedTime) {
      TimeWanted = moment(selectedDate.format('DD MM YYYY ') + selectedTime.format('HH mm'), 'DD MM YYYY HH mm').toISOString();
    }

    this.props.updateBookingWizard({
      timeWanted: TimeWanted,
      timeType: TimeType,
    });

    if (this.props.editMode) {
      const { commandType, navigator } = this.props;

      if (commandType !== 'Push')
        Navigation.dismissModal(this.props.componentId);

      this.props.onEditComplete && this.props.onEditComplete(this.props.componentId);
    }
    else {
      pushScreen(this.props.componentId, {
        component: {
          name: 'bookingPickupAddressScreen'
        }
      });
    }
  }

  _openTimePicker = (timeTypeId) => {
      let timeType,plannedTime;
      const {selectedDate} = this.state
      const {pickupTimeInfo} = this.props.bookingWizard
      if(pickupTimeInfo) {
        plannedTime = pickupTimeInfo.TimePlanned || pickupTimeInfo.TimeNegotiated
      }else {
        plannedTime = undefined
      }
      switch (timeTypeId) {
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

      Navigation.showModal({
        component: {
          name: 'timePicker',
          passProps: {
            title: timeType,
            selectedDate,
            plannedTime,
            onSelection: (time) => {
              this.setState({
                TimeType: timeTypeId,
                selectedTime: time
              });
            }
          }
        }
      });

  }

  _selectToday = () => {
    this.setState({
      dateSelection: 1,
      selectedDate: this.currentDate
    });
  }

  _selectTomorrow = () => {
    this.setState({
      dateSelection: 2,
      selectedDate: moment(this.currentDate).add(1, 'days'),
      TimeType: this.state.TimeType === 'DepartureAround' && this.state.selectedTime === null ? null : this.state.TimeType
    });
  }

  _selectDate = (date) => {
    this.setState({
      selectedDate: date,
      TimeType: this.state.TimeType === 'DepartureEarliest' ? null : this.state.TimeType
    });
  }

  _selectOtherDay = () => {
    this.setState({
      dateSelection: 3,
      selectedDate: null
    });
  }
  _checkBeforeDate(fullDate) {
    const {pickupTimeInfo} = this.props.bookingWizard
    // let plannedTime;
    let plannedTime = moment();
    // if (pickupTimeInfo) {
    //   plannedTime = pickupTimeInfo.TimePlanned || pickupTimeInfo.TimeNegotiated
    //   plannedTime =  moment(plannedTime)
    // }
    if (plannedTime) {
      if (
          this._checkDate(plannedTime, fullDate)
      ) {
        return false
      }
      if (plannedTime.valueOf() > fullDate.valueOf()) {
        return true
      }
      if (plannedTime.valueOf() > fullDate.valueOf()) {
        return true
      }
    } else {
      let now = timeZoneMoment().tz('Europe/Stockholm')
      if (
          now.month() >= fullDate.month() &&
          now.year() >= fullDate.year()
      ) {
        return fullDate.date() < now.date ()
      } else {
        return false
      }
    }
  }
  _checkDate(bookingDate,fullDate){
    return ( bookingDate.date() === fullDate.date() &&
        bookingDate.month() === fullDate.month() &&
        bookingDate.year() === fullDate.year() )
  }
  _checkToday(){
    const {pickupTimeInfo} = this.props.bookingWizard
    let plannedTime;
    if (pickupTimeInfo) {
      plannedTime = pickupTimeInfo.TimePlanned || pickupTimeInfo.TimeNegotiated
      plannedTime =  moment(plannedTime)
    }
    if (plannedTime) {
      let now = timeZoneMoment().tz('Europe/Stockholm')
      return this._checkDate(plannedTime, now)
    } else {
      return true
    }
  }
  _checkNextDate(){
    const {pickupTimeInfo} = this.props.bookingWizard
    let plannedTime;
    if (pickupTimeInfo) {
      plannedTime = pickupTimeInfo.TimePlanned || pickupTimeInfo.TimeNegotiated
      plannedTime =  moment(plannedTime)
    }
    if (plannedTime) {
      let now = timeZoneMoment().tz('Europe/Stockholm')
      return (
          (plannedTime.date() === now.date() ||
              plannedTime.date() === now.date() + 1
          ) &&
          plannedTime.month() === now.month() &&
          plannedTime.year() === now.year())
    } else {
      return true
    }
  }
  render() {
    const {
      dateSelection,
      selectedDate,
      selectedTime,
      TimeType
    } = this.state;
    const currentDate = moment();
    const calendarStartDate = moment().startOf('isoWeek');
    const maxAllowedDate = moment().add(14, 'day');
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
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('bookingWizard.header.title')}</Text>
        </View>

        <WizardSteps step={1}/>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../assets/icons/calendar.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.dateTime.date')}</Text>
            </View>
            {
              selectedDate ? (
                <Touchable onPress={() => this.setState({ dateSelection: 0, selectedDate: null })}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{Format.date(selectedDate, 'dddd, DD MMMM')}</Text>
                      <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.dateTime.changeDate')}</Text>
                  </View>
                </Touchable>
              ) : (
                  <View>
                    {
                     this._checkToday() && <Touchable disabled={dateSelection === 1} onPress={this._selectToday}>
                        <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                          <Text
                              style={styles.sectionText}>{Format.calendar(undefined)}, {Format.date(undefined, 'dddd DD MMMM')}</Text>
                          {
                            dateSelection === 1 ? (
                                <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                            ) : (
                                <Image source={require('../../assets/icons/radio-button.png')}/>
                            )
                          }
                        </View>
                      </Touchable>
                    }

                    {this._checkNextDate() && <Touchable disabled={dateSelection === 2} onPress={this._selectTomorrow}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{Format.calendar(moment().add(1, 'days'))}, {Format.date(moment().add(1, 'days'), 'dddd DD MMMM')}</Text>
                      {
                        dateSelection === 2 ? (
                          <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                        ) : (
                          <Image source={require('../../assets/icons/radio-button.png')}/>
                        )
                      }
                    </View>
                  </Touchable>
                    }

                  <Touchable disabled={dateSelection === 3} onPress={this._selectOtherDay}>
                    <View style={styles.section}>
                      <View style={[styles.sectionRow, styles.spaceBetween]}>
                        <Text style={styles.sectionText}>{I18n.t('bookingWizard.dateTime.otherDay')}</Text>
                        {
                          dateSelection === 3 ? (
                            <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                          ) : (
                            <Image source={require('../../assets/icons/radio-button.png')}/>
                          )
                        }
                      </View>
                      <Collapsible collapsed={dateSelection != 3}>
                        <View style={{ paddingBottom: 10 }}>
                          <View style={styles.calendarWeek}>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.0`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.1`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.2`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.3`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.4`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.5`)}</Text>
                            <Text style={styles.calendarWeekText}>{I18n.t(`calendar.days.6`)}</Text>
                          </View>
                          <View style={styles.calendarDateContainer}>
                            {
                              _.map(Array(3), (row, rowIndex) => {
                                return (
                                  <View key={rowIndex} style={styles.calendarDateRow}>
                                    {
                                      _.map(Array(7), (column, columnIndex) => {
                                        const cumulativeIndex = rowIndex * 7 + columnIndex;
                                        var currentCalendarDate = calendarStartDate.clone().add(cumulativeIndex, 'day');
                                        var active = true;
                                        if (currentCalendarDate.isBefore(currentDate, 'day') || currentCalendarDate.isAfter(maxAllowedDate, 'day'))
                                          active = false;
                                        if(this._checkBeforeDate(currentCalendarDate)){
                                          active=false;
                                          return (
                                              <Touchable
                                                  disabled={!active}
                                                  key={cumulativeIndex}
                                              >
                                                <View
                                                    style={[
                                                      styles.calendarDate, active ? styles.calendarDateActive : null,
                                                      selectedDate && selectedDate.isSame(currentCalendarDate, 'date') ? styles.calendarDateSelected : null
                                                    ]}>
                                                  {
                                                    active && (
                                                        <Text style={styles.calendarDateText}>{currentCalendarDate.date()}</Text>
                                                    )
                                                  }
                                                </View>
                                              </Touchable>
                                          );
                                        }
                                        return (
                                          <Touchable
                                            disabled={!active}
                                            key={cumulativeIndex}
                                            onPress={() => this._selectDate(currentCalendarDate)}>
                                            <View
                                              style={[
                                                styles.calendarDate, active ? styles.calendarDateActive : null,
                                                selectedDate && selectedDate.isSame(currentCalendarDate, 'date') ? styles.calendarDateSelected : null
                                              ]}>
                                              {
                                                active && (
                                                  <Text style={styles.calendarDateText}>{currentCalendarDate.date()}</Text>
                                                )
                                              }
                                            </View>
                                          </Touchable>
                                        );
                                      })
                                    }
                                  </View>
                                );
                              })
                            }
                          </View>
                        </View>
                      </Collapsible>
                    </View>
                  </Touchable>
                </View>
              )
            }

          </View>

          <View style={{ height: 10 }}/>

          <View opacity={selectedDate || (TimeType !== null) ? 1 : 0.5} pointerEvents={selectedDate || (TimeType !== null) ? 'auto' : 'none'}>
            <View style={[styles.sectionTop, styles.sectionRow]}>
              <Image source={require('../../assets/icons/time.png')}/>
              <Text style={styles.sectionTitle}>{I18n.t('bookingWizard.dateTime.time')}</Text>
            </View>
            {
              TimeType !== null ? (
                <Touchable onPress={() => this.setState({ TimeType: null, selectedTime: null })}>
                  <View style={styles.sectionComplete}>
                    <View style={[styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{TimeType == 'DepartureAround' && !selectedTime ? I18n.t(`bookingWizard.dateTime.asap`) : timeType + ' ' + Format.date(selectedTime, 'HH:mm')}</Text>
                      <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                    </View>
                    <Text style={styles.sectionTextSmall}>{I18n.t('bookingWizard.dateTime.changeTime')}</Text>
                  </View>
                </Touchable>
              ) : (
                <View>
                  {
                    selectedDate && selectedDate.isSame(this.currentDate, 'day') ? (
                      <Touchable onPress={() => this.setState({ TimeType: 'DepartureAround', selectedTime: null })}>
                        <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                          <Text style={styles.sectionText}>{I18n.t(`bookingWizard.dateTime.asap`)}</Text>
                          <Image source={require('../../assets/icons/radio-button.png')}/>
                        </View>
                      </Touchable>
                    ) : null
                  }

                  <Touchable onPress={() => this._openTimePicker('DepartureAround')}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t(`bookingWizard.dateTime.departureAround`)}{'...'}</Text>
                      <Image source={require('../../assets/icons/radio-button.png')}/>
                    </View>
                  </Touchable>

                  <Touchable onPress={() => this._openTimePicker('DepartureEarliest')}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t(`bookingWizard.dateTime.departureEarliest`)}{'...'}</Text>
                      <Image source={require('../../assets/icons/radio-button.png')}/>
                    </View>
                  </Touchable>

                  <Touchable onPress={() => this._openTimePicker('ArrivalLatest')}>
                    <View style={[styles.section, styles.sectionRow, styles.spaceBetween]}>
                      <Text style={styles.sectionText}>{I18n.t(`bookingWizard.dateTime.arrivalLatest`)}{'...'}</Text>
                      <Image source={require('../../assets/icons/radio-button.png')}/>
                    </View>
                  </Touchable>
                </View>
              )
            }
          </View>
        </ScrollView>

        <LinearGradient
          colors={COLOR.TAB_GRADIENT}
          start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1}}
          locations={[0, 0.2]}
          style={styles.tabBar}>
          <View style={styles.buttonContainer}>
            <BorderButton
              textStyle={styles.backButtonText}
              title={I18n.t('button.back')}
              onPress={this._navigateToPreviousScreen}/>
          </View>

          <View style={styles.buttonSpace}/>

          <View style={styles.buttonContainer}>
            <Button
              disabled={TimeType === null || dateSelection === 0}
              onPress={this._continue}
              title={I18n.t('button.continueSmall')}/>
          </View>
        </LinearGradient>
      </Screen>
    );
  }
}

export default BookingWizardScreen;
