import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View
} from 'react-native';
import {
  Loader,
  SearchInput,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './address-search-screen.style';
import { debounce } from 'lodash';
import { Circle, Bar } from 'react-native-progress';
import { COLOR } from '@constants';
import ViewOverflow from 'react-native-view-overflow';
import I18n from '@locales';
import _ from 'lodash';

class AddressSearchScreen extends Component {
  static options() {
    return {
      modalPresentationStyle: 'overCurrentContext',
      layout: {
        backgroundColor: 'transparent'
      },
      animations: {
        dismissModal: {
          enabled: 'false'
        },
        showModal: {
          enabled: 'false'
        }
      }
    }
  }

  static defaultProps = {
    title: I18n.t('searchAddress.title')
  }

  state = {
    searchText: '',
    isLoading: false,
    Addresses: []
  }

  _navigateToPreviousScreen = () => {
    const { commandType } = this.props;

    if (commandType === 'Push')
      Navigation.pop(this.props.componentId);
    else
      Navigation.dismissModal(this.props.componentId);
  }

  _search = debounce(() => {
    this.setState({ isLoading: true });

    this.props.searchAddresses(this.state.searchText)
      .then(response => {
        this.setState({
          Addresses: response.data.Addresses,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  }, 1000);

  _onPressAddress = (address) => {
    const { title, userAddresses } = this.props;

    if (this.props.onSelectAddress) {
      if (title === I18n.t('pickupAddress.title') && _.find(userAddresses, (userAddress) => userAddress === address))
        address = address.Address;

      this.props.onSelectAddress(address);
      this._navigateToPreviousScreen();
    }
  }

  render() {
    var { Addresses, searchText, isLoading } = this.state;
    const { title, userAddresses } = this.props
    const prePopulatedAddresses = userAddresses;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <ViewOverflow style={styles.headerIconContainer}>
              <Image source={require('../../assets/icons/location-modal.png')}/>
            </ViewOverflow>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                style={styles.closeButton}
                onPress={this._navigateToPreviousScreen}>
                <Image source={require('../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title }>{title}</Text>
            </View>
            <SearchInput
              autoFocus
              autoCapitalize={'none'}
              onSubmitEditing={this._search}
              value={searchText}
              onChangeText={(searchText) => this.setState({ searchText }, this._search)}
              placeholder={I18n.t('placeholder.search')}/>

            <View style={styles.listView}>
              <FlatList
                keyboardShouldPersistTaps={'always'}
                style={styles.listView}
                data={Addresses}
                keyExtractor={(item, index) => String(index)}
                ListHeaderComponent={() => (<View style={styles.listItemSeparator} />)}
                ListFooterComponent={() => (<View style={styles.listItemSeparator} />)}
                ItemSeparatorComponent={() => (<View style={styles.listItemSeparator} />)}
                renderItem={({index, item}) => {
                  var addressMainText = item['Name'];
                  var addressStreetName = item['StreetName'];
                  var addressNumber = item['StreetNumber'];
                  var addressCity = item['City'];
                  var addressSecondaryText;

                  if (!addressMainText) {
                    addressMainText = addressStreetName + " " + addressNumber; // the street and number will be main header text, and no secondary text is relevant
                    if (addressCity)
                      addressMainText += ", " + addressCity;
                  }
                  else {
                    // There is a place name, so we add the street name too
                    addressSecondaryText = addressStreetName + " " + addressNumber;
                    if (addressCity)
                      addressSecondaryText += ", " + addressCity;
                  }

                  return (
                    <Touchable onPress={() => this._onPressAddress(item)}>
                    <View style={[styles.listItem, styles.flex1]}>
                        <Text numberOfLines={1} style={styles.listItemText}>{addressMainText}</Text>
                        {
                          addressSecondaryText ? (
                            <View>
                              <Text numberOfLines={1} style={[styles.sectionTextSmall]}>{addressSecondaryText}</Text>
                            </View>
                          ) : null
                        }
                        <View style={{height: 6}}/>
                      </View>
                    </Touchable>
                    )
                }
                }/>
              {
                isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Bar
                      width={150}
                      height={1}
                      color={COLOR.ACTIVITY_INDICATOR}
                      indeterminate={true} />
                  </View>
                ) : null
              }
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}

export default AddressSearchScreen
