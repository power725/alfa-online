import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Text, Touchable} from '@components';
import {Format} from '@helpers';
import styles from './tab-bar.style';
import I18n from '@locales';
import {transport} from "@constants";
class TabBar extends Component {
  _renderIcon(type){
    let jobIcon;
    if(type === 'Walk'){
      jobIcon = transport('walk')
    }else if(type=== 'CarryHelp'){
      jobIcon = transport('carryhelp')
    }else{
      jobIcon = <Image source={transport(type)}/>
    }
    return jobIcon
  }
  render() {
    const {activeTab, goToPage, tabs, nodes} = this.props;
    return (
      <View style={styles.container}>
        {tabs.map((job, index) => {
          const jobDateTime =
            job.Nodes[0].TimeInfo.TimePlanned ||
            nodes[0].TimeInfo.TimeNegotiated;
          const jobTime = Format.time(jobDateTime)==='Invalid date'
              ? I18n.t("dashboard.unplanned.notPlanned") :
              Format.time(jobDateTime);
          const vehicleName = job.VehicleInfo
            ? job.VehicleInfo.VehicleName
            : '-';

          return (
            <Touchable onPress={() => goToPage(index)} key={index}>
              <View
                style={index === activeTab ? styles.tabSelected : styles.tab}>
                <View
                  style={[styles.statusBar, styles[job.JobState.toLowerCase()]]}
                />
                <View style={[styles.row, styles.flex1]}>
                  <View style={styles.iconColumn}>
                   {this._renderIcon(job.JobType)}
                  </View>
                  <View style={styles.textColumn}>
                    <Text style={styles.textPrimary}>{jobTime}</Text>
                    <Text numberOfLines={1} style={styles.textSecondary}>
                      {vehicleName}
                    </Text>
                  </View>
                </View>
              </View>
            </Touchable>
          );
        })}
      </View>
    );
  }
}

export default TabBar;
