import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View
} from 'react-native';
import {
  Button,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './driver-assistance-screen.style';
import ViewOverflow from 'react-native-view-overflow';
import LinearGradient from 'react-native-linear-gradient';
import I18n from '@locales';

class DriverAssistanceScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    selectedItem: null
  }

  _closeModal = () => {
    const { commandType, navigator } = this.props;

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _confirm = () => {
    const { selectedItem } = this.state;

    this.props.onConfirm && this.props.onConfirm(selectedItem);
    this._closeModal();
  }

  _onPressItem = (selectedItem) => {
    this.setState((state) => {
      return { selectedItem };
    });
  }

  _renderItem = ({item, index}) => {
    const { selectedItem } = this.state;

    return (
      <Touchable accessible={true} onPress={() => this._onPressItem(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            {/*<Image source={item.icon}/>*/}
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.Name}</Text>
          </View>
          <View>
            {
              selectedItem && selectedItem.Id === item.Id ? (
                <Image source={require('../../../assets/icons/radio-button-checked.png')}/>
              ) : (
                <Image source={require('../../../assets/icons/radio-button.png')}/>
              )
            }
          </View>
        </View>
      </Touchable>
    );
  }

  render() {
    const { AllowedAssistances } = this.props;
    const { selectedItem } = this.state;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../../assets/icons/seating-type.png')}/>
            </ViewOverflow>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                onPress={this._closeModal}
                style={styles.closeButton}>
                <Image source={require('../../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <Text style={styles.title}>{I18n.t(`bookingWizard.driverAssistance.title`)}</Text>

            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContentContainer}
                data={AllowedAssistances}
                keyExtractor={(item, index) => String(item.Id)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}/>
            </View>

            <LinearGradient
              colors={['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 1)']}
              start={{x: 0.5, y: 0.0}} end={{x: 0.5, y: 1}}
              locations={[0, 0.1]}
              style={styles.buttonContainer}>
              <Button
                disabled={!selectedItem}
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

export default DriverAssistanceScreen;
