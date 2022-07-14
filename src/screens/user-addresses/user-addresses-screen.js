import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Loader,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './user-addresses-screen.style';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '@constants';
import I18n from '@locales';

class UserAddressesScreen extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.props.getCustomerAddresses()
      .then(response => {
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _showAddAddressModal = () => {
    Navigation.showModal({
      component: {
        name: 'addUserAddressModal'
      }
    })
  }

  _editUserAddress = (userAddress) => {
    Navigation.showModal({
      component: {
        name: 'addUserAddressModal',
        passProps: {
          userAddress
        }
      }
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <Touchable onPress={() => this._editUserAddress(item)}>
        <View style={styles.addressItem}>
          <View style={styles.flex1}>
            <View style={styles.addressItemRow}>
              <Text style={styles.addressTitle}>{item.Name.trim()}</Text>
              <View style={styles.addressCategoryContainer}>
                <Text style={styles.addressCategory}>{item.AddressCategory.Name}</Text>
              </View>
            </View>
            <Text style={styles.addressFullText}>{item.Address.Name}</Text>
          </View>

          <View style={styles.addressIconColumn}>
            <Image style={styles.addressChevron} source={require('../../assets/icons/chevron.png')}/>
          </View>
        </View>
      </Touchable>
    );
  }

  render() {
    const { customerAddresses } = this.props;
    const { isLoading } = this.state;

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('userAddresses.title')}</Text>
        </View>

        <View style={styles.body}>
          <FlatList
            style={styles.addressList}
            contentContainerStyle={styles.addressListContentContainer}
            data={customerAddresses}
            keyExtractor={(item, index) => String(item.Id)}
            ItemSeparatorComponent={() => <View style={styles.addressItemSeparator}/>}
            renderItem={this._renderItem}/>
        </View>

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
            <Button onPress={this._showAddAddressModal} title={I18n.t('button.add')}/>
          </View>

        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default UserAddressesScreen;
