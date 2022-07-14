import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  View
} from 'react-native';
import {
  Button,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './time-picker.style';
import _ from 'lodash';
import moment from 'moment';
import timeZoneMoment from 'moment-timezone'
import ViewOverflow from 'react-native-view-overflow';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = (SCREEN_WIDTH - 110) / 6 / 1.4375 + 10;
import I18n from '@locales';

class TimePicker extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#434859',
  };

  constructor(props) {
    super(props);

    this.currentScroll = ITEM_HEIGHT;

    this.state = {
      hours: null,
      minutes: null
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android')
      setTimeout(() => this.scrollView.scrollTo({x: 0, y: ITEM_HEIGHT}) , 0);
  }

  _onPressClose = () => {
    Navigation.dismissModal(this.props.componentId);
  }

  _setHours = (hours) => {
    this.setState({
      hours
    });
  }

  _setMinutes = (minutes) => {
    this.setState({
      minutes
    });
  }

  _onScroll = ({nativeEvent}) => {
    this.currentScroll = nativeEvent.contentOffset['y'];
  }

  _scroll = (upwards) => {
    const currentRow = Math.round(this.currentScroll / ITEM_HEIGHT);

    if ((currentRow > 0 && upwards) || (currentRow < 2 && !upwards)) {
      const direction = upwards ? -1 : 1;

      this.scrollView.scrollTo({x: 0, y: ITEM_HEIGHT * (currentRow + direction) });
    }
  }
  _checkBeforeDate(){
    const {plannedTime,selectedDate} = this.props;
    if(plannedTime) {
      let selectedReturnDate = moment(selectedDate);
      let bookingDay = moment(plannedTime);
      if (
          bookingDay.date() === selectedReturnDate.date() &&
          bookingDay.month() === selectedReturnDate.month() &&
          bookingDay.year() === selectedReturnDate.year()
      ) {
        return false
      }
      if (bookingDay.valueOf() > selectedReturnDate.valueOf()) {
        return true
      }
    }
  }
  _checkIsToday(){
    const {plannedTime,selectedDate} = this.props;
    if(plannedTime) {
      let selectedReturnDate = moment(selectedDate)
      let bookingDay = moment(plannedTime)
      return(
          selectedReturnDate.month() === bookingDay.month()
          && selectedReturnDate.date() === bookingDay.date()
          && selectedReturnDate.year() === bookingDay.year()
      )
    }else{
      const now=timeZoneMoment().tz('Europe/Stockholm')
      return (
          now.date() === selectedDate.date() &&
          now.month() === selectedDate.month() &&
          now.year() === selectedDate.year()
      )
    }
  }

  _checkHoursAndMinutes(date,index,requiredMinutes=5,type,planned){
    const nowDate=timeZoneMoment().tz('Europe/Stockholm');
    const isLateTime = date.hours() === index &&
        date.minutes()+requiredMinutes>55 &&
        type==='hours'&& planned
    const isLateMinutes=( 60 - (date.minutes()+requiredMinutes))
    const isNextHourLate=this.state.hours===date.hours()+1 && isLateMinutes<=0
    const lateMinutes=isLateMinutes < 0 ? -isLateMinutes : 0
    if (isLateTime) return true
    if(!this._checkIsToday()){
      const {selectedDate} = this.props
      let selectedReturnDate = moment(selectedDate);
      if(
          nowDate.month() === selectedReturnDate.month()
          && nowDate.date() === selectedReturnDate.date()
          && nowDate.year() === selectedReturnDate.year()
      ) {
        if(isNextHourLate &&  type === 'minutes'){
          return  index <= lateMinutes
        }
        const requiredMinutes = 5
        return (type === 'hours') ? nowDate.hours() > index : (
            nowDate.hours() === this.state.hours &&
            nowDate.minutes() > index - requiredMinutes
        )
      }
    }
    if(
        this._checkIsToday() &&
        nowDate.date()===date.date() &&
        nowDate.hours() === index &&
        type==='hours' &&
        nowDate.minutes() > 55 - requiredMinutes
    ){
      return true
    }
    if(this._checkIsToday() && isNextHourLate &&  type === 'minutes'){
      return  index <= lateMinutes
    }
    return (type === 'hours') ? (
        this._checkIsToday() && date.hours() > index) : (
        this._checkIsToday() && date.hours() === this.state.hours &&
        date.minutes() > index - requiredMinutes
    )
  }
  _checkTodayDate(now,planned){
    return ( now.date() === planned.date() &&
        now.month() === planned.month() &&
        now.year() === planned.year() )
  }
  _compareDateWithAnotherTimeZones(now,planned){
    return(
        this._checkTodayDate(now,planned) &&
        (
            now.hour() >= planned.hour() &&
            now.minutes() >= planned.minutes() &&
            now.seconds() >= planned.seconds()
        )
    )
  }
  _checkIsOldPlannedDate = (now,planned) => now.date() > planned.date()

  _checkDay(type, index){
    const {plannedTime} = this.props
    const nowDate=timeZoneMoment().tz('Europe/Stockholm')
    if(plannedTime) {
      const requiredMinutes = 10
      const checkIsPlanned = this._compareDateWithAnotherTimeZones(nowDate,moment(plannedTime))
      const checkIsOld = this._checkIsOldPlannedDate(nowDate,moment(plannedTime))
      if(checkIsOld){
        return this._checkHoursAndMinutes(nowDate,index,5, type,)
      }
      return checkIsPlanned ?
          this._checkHoursAndMinutes(nowDate,index,5, type,) :
          this._checkHoursAndMinutes(moment(plannedTime),index,requiredMinutes, type,'planned')
    }else{
      const requiredMinutes = 5
      return this._checkHoursAndMinutes(nowDate,index,requiredMinutes, type,)
    }
  }
  render() {
    const { hours, minutes } = this.state;
    const { title, onSelection, plannedTime } = this.props;
    return (
      <Screen>
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View style={[styles.sectionTop, !hours && styles.sectionSelected]}>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                style={styles.closeButton}
                onPress={this._onPressClose}>
                <Image source={require('../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>
            <ViewOverflow style={styles.clockIcon}>
              <Image source={require('../../assets/icons/clock.png')}/>
            </ViewOverflow>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.instructionRow}>
              <Text style={styles.instructionText}>{I18n.t('placeholder.chooseHour')}</Text>
              <View style={styles.flex1}/>
              <Touchable onPress={() => this._scroll(true)}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.actionText}>{I18n.t('placeholder.showEarlier')}</Text>
                  <Image style={styles.actionIcon} source={require('../../assets/icons/picker-up.png')}/>
                </View>
              </Touchable>
            </View>
            <ScrollView
              ref={(scrollView) => this.scrollView = scrollView}
              onScroll={this._onScroll}
              contentOffset={{x: 0, y: ITEM_HEIGHT}}
              snapToAlignment={'start'}
              snapToInterval={Math.round((SCREEN_WIDTH - 110) / 6 / 1.4375) + 10}
              decelerationRate={0.1}
              style={styles.hourContainer} contentContainerStyle={styles.hourContentContainer}>
              {
                _.map(Array(4), (row, rowIndex, list) => {
                  return (
                    <View key={rowIndex} style={[styles.itemRow, { marginBottom: rowIndex === list.length - 1 ? 0 : 10}]}>
                      {
                        _.map(Array(6), (column, columnIndex, total) => {
                          const cumulativeIndex = rowIndex * total.length + columnIndex;
                          if(this._checkBeforeDate()){
                            return (
                                <View
                                    style={[styles.item, hours === cumulativeIndex && styles.itemSelected]}/>
                            );
                          }
                          if(this._checkDay('hours', cumulativeIndex)){
                            return (
                                  <View
                                      style={[styles.item, hours === cumulativeIndex && styles.itemSelected]}/>
                            );
                          }
                          return (
                            <Touchable key={cumulativeIndex} onPress={() => this._setHours(cumulativeIndex)}>
                              <View
                                style={[styles.item, styles.itemActive, hours === cumulativeIndex && styles.itemSelected]}>
                                <Text style={styles.itemText}>{(cumulativeIndex) < 10 ? '0' : ''}{cumulativeIndex}</Text>
                              </View>
                            </Touchable>
                          );
                        })
                      }
                    </View>
                  );
                })
              }
            </ScrollView>
            <View style={styles.instructionRow}>
              <View style={styles.flex1}/>
              <Touchable onPress={() => this._scroll(false)}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.actionText}>{I18n.t('placeholder.showLater')}</Text>
                  <Image style={styles.actionIcon} source={require('../../assets/icons/picker-down.png')}/>
                </View>
              </Touchable>
            </View>
          </View>

          <View style={styles.space10}/>

          <View style={[styles.sectionBottom, !!hours && styles.sectionSelected]}>
            <View style={styles.instructionRow}>
              <Text style={styles.instructionText}>{I18n.t('placeholder.chooseMinute')}</Text>
            </View>
            <View style={styles.minuteContainer}>
              {
                _.map(Array(2), (row, rowIndex) => {
                  return (
                    <View key={rowIndex} style={styles.itemRow}>
                      {
                        _.map(Array(6), (column, columnIndex, total) => {
                          const cumulativeIndex = (rowIndex * total.length + columnIndex) * 5;
                          if(this._checkBeforeDate()){
                            return (
                                <View
                                    style={[styles.item, minutes === cumulativeIndex && styles.itemSelected]}/>
                            );
                          }
                          if(this._checkDay('minutes', cumulativeIndex)){
                            return (
                                <View
                                    style={[styles.item, minutes === cumulativeIndex && styles.itemSelected]}/>
                            );
                          }
                          return (
                            <Touchable key={cumulativeIndex} onPress={() => this._setMinutes(cumulativeIndex)}>
                              <View
                                style={[styles.item, styles.itemActive, minutes === cumulativeIndex && styles.itemSelected]}>
                                <Text style={styles.itemText}>{(cumulativeIndex) < 10 ? '0' : ''}{cumulativeIndex}</Text>
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
        </ScrollView>
        <View style={styles.footer}>
          <Button
            disabled={hours === null || minutes === null}
            onPress={() => {
              onSelection && onSelection(moment().set('hours', hours).set('minutes', minutes));
              Navigation.dismissModal(this.props.componentId);
            }}
            title={I18n.t('button.done')}/>
        </View>
      </Screen>
    );
  }
}

export default TimePicker;
