import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View
} from 'react-native';
import {
  Button,
  NumberPicker,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './co-travellers-screen.style';
import ViewOverflow from 'react-native-view-overflow';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '@locales';
import _ from 'lodash';

class SeatingTypeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);

    const { AllowedCoTravellers } = props;
    const coTravellers = new Map();
    _.each(AllowedCoTravellers, coTraveller => coTravellers.set(coTraveller.Key.Id, 0));

    this.state = {
      coTravellers
    }
  }

  _closeModal = () => {
    const { commandType, navigator } = this.props;

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _confirm = () => {
    const { coTravellers } = this.state;

    // const coTravellersParams = {};
    //
    // coTravellers.forEach((value, key) => {
    //   coTravellersParams[key] = value;
    // })

    this.props.onConfirm && this.props.onConfirm(coTravellers);
    this._closeModal();
  }

  _renderItem = ({item, index}) => {
    const { coTravellers } = this.state;

    return (
      <View accessible={true} style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          {/*<Image source={item.icon}/>*/}
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{item.Key.Name}</Text>
        </View>
        <View>
          <NumberPicker
            max={item.Value}
            value={coTravellers.get(item.Key.Id)}
            onChangeValue={(value) => coTravellers.set(item.Key.Id, value)}/>
        </View>
      </View>
    );
  }

  render() {
    const { AllowedCoTravellers } = this.props;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../assets/icons/co-travellers.png')}/>
            </ViewOverflow>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                onPress={this._closeModal}
                style={styles.closeButton}>
                <Image source={require('../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <Text style={styles.title}>{I18n.t(`bookingWizard.coTravellers.title`)}</Text>

            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContentContainer}
                data={AllowedCoTravellers}
                keyExtractor={(item, index) => String(item.Key.Id)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}/>
            </View>

            <LinearGradient
              colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 1)']}
              start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1}}
              locations={[0, 0.1]}
              style={styles.buttonContainer}>
              <Button
                onPress={this._confirm}
                style={styles.button}
                title={I18n.t(`button.confirm`)}/>
            </LinearGradient>
          </View>
        </View>
      </Screen>
    );
  }
}

export default SeatingTypeScreen;
