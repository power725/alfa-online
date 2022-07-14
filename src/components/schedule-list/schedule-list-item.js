import React, {Component} from 'react';
import {View,Image} from 'react-native';
import {Text, Touchable} from '@components';
import Placeholder from 'rn-placeholder';
import styles from './schedule-list-item.style';
import {Format} from '@helpers';
import I18n from '@locales';
import {transport} from "@constants";
class ScheduleListItem extends Component {
  _renderIcon(type){
      let jobIcon;
      if(type === 'Walk'){
          jobIcon = transport('walk')
      }else if(type=== 'CarryHelp'){
          jobIcon = transport('carryhelp')
      }else{
          jobIcon = <Image style={styles.vehicleType} source={transport(type)}/>
      }
      return jobIcon
  }
  _renderDec(newBookings,job,i){
      if(newBookings.length>1){
          const border = newBookings.length-1 !== i ? { backgroundColor: 'grey' } : null
          return(
              <View style={styles.vehicleTypeAndTimeRow}>
                  <View style={styles.iconJobContainer}>
                    {this._renderIcon(job.JobType)}
                  </View>
                  <View style={[styles.leftBorder, border ]}/>
              </View>
          )
      }
      return null
  }
  _renderInfo(job,TimeDelayed){
      return (
          <View style={styles.info}>
              <Text
                  numberOfLines={1}
                  style={[
                      TimeDelayed ? styles.strikeThrough : null,
                      styles.listItemPrimaryText,
                      { fontWeight:'700' }
                  ]}>
                  {Format.time(job.TimePickup)==='Invalid date' ? I18n.t("dashboard.unplanned.notPlanned") : Format.time(job.TimePickup)}{' '}
                  {TimeDelayed ? (
                      <Text style={styles.listItemDelayText}>
                          {Format.time(TimeDelayed)}
                      </Text>
                  ) : null}
              </Text>
              <Text numberOfLines={1} style={styles.listItemSecondaryText}>
                  {job.AddressFrom}
              </Text>
              <Text numberOfLines={1} style={styles.listItemSecondaryText}>
                  {job.AddressTo}
              </Text>
          </View>
      )
  }
  render() {
    const {booking, onPressItem, isLoadingBookings, fetchingData} = this.props;
    if (!booking) {
      return (
        <View style={styles.emptyItem}>
          <View style={[styles.listItemLeftBar, styles.empty]} />
          <View style={styles.listItemTextContainer}>
            <Placeholder.Paragraph
              animate="fade"
              lineNumber={3}
              lineSpacing={10}
              onReady={!fetchingData && !isLoadingBookings}
            />
          </View>
        </View>
      );
    }
   let newBookings=booking.Jobs.filter(job=>job.JobType!=='CarryHelp')
    return (
      <View>
        {newBookings.map((job,index) => {
          const {TimeDelayed} = job;
          return (
            <Touchable
              key={job.Id}
              onPress={() => onPressItem && onPressItem(booking, job)}>
              <View style={[
                  styles.listItem,
                  newBookings.length> 1 ? {borderRadius:0, borderBottomLeftRadius:6, borderTopLeftRadius:6   } : null,
                  index === newBookings.length-1 ? {borderBottomRightRadius:3, borderBottomLeftRadius:3} : null,
                  index === 0 ? {borderTopRightRadius:3, borderTopLeftRadius:3} : null,
              ]}>
                <View
                  style={[
                    styles.listItemLeftBar,
                    styles[
                        job.JobType==='PublicTransport'
                            ? 'public'
                            : job.JobState.toLowerCase()
                        ],
                  ]}
                />
                <View style={styles.listItemTextContainer}>
                  {this._renderDec(newBookings,job,index)}
                  {this._renderInfo(job,TimeDelayed)}
                </View>
              </View>
            </Touchable>
          );
        })}
      </View>
    );
  }
}

export default ScheduleListItem;
