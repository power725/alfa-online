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
import styles from './luggage-type-screen.style';
import ViewOverflow from 'react-native-view-overflow';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '@locales';
import _ from 'lodash';

class LuggageTypeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);

    const { AllowedEquipment } = props;
    const equipment = new Map();
    _.each(AllowedEquipment, equipmentItem => equipment.set(equipmentItem.Key.Id, 0));

    this.state = {
      equipment
    }
  }

  state = {
    selectedItems: new Map()
  }

  _closeModal = () => {
    const { commandType, navigator } = this.props;

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _confirm = () => {
    const { equipment } = this.state;

    // const coTravellersParams = {};
    //
    // coTravellers.forEach((value, key) => {
    //   coTravellersParams[key] = value;
    // })

    this.props.onConfirm && this.props.onConfirm(equipment);
    this._closeModal();
  }

  _renderItem = ({item, index}) => {
    const { equipment } = this.state;

    return (
      <View accessible={true} style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Image source={item.icon}/>
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>{item.Key.Name}</Text>
        </View>
        <View>
          <NumberPicker
            max={item.Value}
            value={equipment.get(item.Key.Id)}
            onChangeValue={(value) => equipment.set(item.Key.Id, value)}/>
        </View>
      </View>
    );
  }

  render() {
    const { AllowedEquipment } = this.props;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../assets/icons/luggage-type.png')}/>
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

            <Text style={styles.title}>{I18n.t(`bookingWizard.luggageType.title`)}</Text>

            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContentContainer}
                data={AllowedEquipment}
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

export default LuggageTypeScreen;
