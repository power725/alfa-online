import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  Text
} from '@components';
import styles from './route.style';

class Route extends Component {
  static defaultProps = {
    completedAddresses: []
  }

  render() {
    const { completedAddresses, route } = this.props;

    return (
      <View style={styles.container}>
        {
          route.map((routeNode, index, list) => (
            <View key={index} style={styles.row}>
              <View style={styles.graphContainer}>
                <View style={[styles.graphLine, index == 0 && styles.graphEmptyLine]}/>
                <View style={[styles.graphPoint, completedAddresses.includes(index) && styles.graphPointCompleted]}/>
                <View style={[styles.graphLine, index === list.length -1 && styles.graphEmptyLine]}/>
              </View>
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={[completedAddresses.includes(index) && styles.strikeThrough, styles.text]}>{routeNode.formattedAddress}</Text>
              </View>
              {
                routeNode.locationType === 'home' && (
                  <View style={styles.iconContainer}>
                    <Image source={require('../../assets/icons/route-home.png')}/>
                  </View>
                )
              }
            </View>
          ))
        }
      </View>
    );
  }
}

export default Route;
