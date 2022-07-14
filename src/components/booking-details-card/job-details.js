import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text} from '@components';
import styles from './job-details.style';
import ViewOverflow from 'react-native-view-overflow';
import Icons from '@icons';
import _ from 'lodash';
import I18n from '@locales';

class JobDetails extends Component {
  render() {
    const {seatingType, coTravellers, equipments, job} = this.props;

    return (
      <View style={[styles.container, styles.row]}>
        <View style={[styles.tagsContainer, styles.row]}>
          <View style={styles.tag}>
            <Image style={styles.tagIcon} source={Icons[seatingType.Code]} />
            <View style={styles.tagTextContainer}>
              <Text style={styles.tagText}>{seatingType.Name}</Text>
            </View>
          </View>

          {
            _.map(coTravellers || [], (coTraveller, index) => coTraveller.Key.Code != 'None' && (
              <View key={index} style={styles.tag}>
                <Image style={styles.tagIcon} source={Icons[coTraveller.Key.Code]}/>
                <View style={styles.tagTextContainer}>
                  <Text style={styles.tagText}>{`${coTraveller.Value} ${coTraveller.Key.Name}`}</Text>
                </View>
              </View>
            ))
          }

          {
            _.map(equipments || [], (equipment, index) => equipment.Key.Code != 'None' && (
              <View key={index} style={styles.tag}>
                <Image style={styles.tagIcon} source={Icons[equipment.Key.Code]}/>
                <View style={styles.tagTextContainer}>
                  <Text style={styles.tagText}>{`${equipment.Value} ${equipment.Key.Name}`}</Text>
                </View>
              </View>
            ))
          }

        </View>

        {
          job.ServiceFee && (job.JobType !=='CarryHelp') ? (
            <ViewOverflow style={styles.priceContainer}>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{job.ServiceFee ? job.ServiceFee.Fee : 'N/A'} <Text style={styles.priceTextSmall}>{job.ServiceFee.CurrencyShort}</Text></Text>
              </View>
              <Text style={styles.tagText}>{job.ServiceFee.IsInvoiced ? I18n.t('placeholder.invoiced') : I18n.t('placeholder.notInvoiced')}</Text>
            </ViewOverflow>
          ) : null
        }
      </View>
    );
  }
}

export default JobDetails;
