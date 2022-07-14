import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  Text
} from '@components';
import styles from './no-job-card.style';
import I18n from '@locales';

class NoJobCard extends Component {
  render() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.primaryText}>{I18n.t('dashboard.noJob.futureBooking')}</Text>
        <View style={styles.spacer26} />
        <View style={styles.row}>
          <View style={[styles.flex1, styles.marginContainer]}>
            <Text style={styles.secondaryText}>{I18n.t('placeholder.press')}{' '}<Text style={styles.secondaryTextHighlight}>{I18n.t('button.newBooking')}</Text> {I18n.t('dashboard.noJob.atTheBottom')} </Text>

            <View style={styles.flex1}/>

            <View style={styles.arrowContainer}>
              <Image source={require('../../../assets/icons/booking-right-arrow.png')}/>
            </View>
          </View>

          <View>
            <View style={styles.flex1}/>
            <Image source={require('../../../assets/icons/no-job-hand.png')}/>
          </View>
        </View>
      </View>
    );
  }
}

export default NoJobCard;
