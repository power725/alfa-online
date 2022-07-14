import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
} from 'react-native';
import {
  Button,
  BorderButton,
  Screen,
  SearchInput,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './select-customer-screen.style';
import _ from 'lodash';
import I18n from '@locales';

class SelectCustomerScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    const { customers } = props;

    this.state = {
      searchText: '',
      searchedItems: customers,
      selectedCustomerId: null
    };
  }

  _onPressClose = () => {
    Navigation.dismissModal(this.props.componentId);
  }

  _selectItem = (item) => {
    this.setState({
      selectedCustomerId: item.Id
    });
  }

  _confirmSelection = () => {
    const { selectedCustomerId } = this.state;

    this.props.onSelect && this.props.onSelect(selectedCustomerId);
    this._onPressClose();
  }

  render() {
    var { onItemPress } = this.props;
    var { searchedItems, searchText, selectedCustomerId } = this.state;

    return (
      <Screen>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.contentContainer}>
            <View style={{alignItems: 'flex-end', paddingTop: 15}}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                onPress={this._onPressClose}>
                <Image source={require('../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <View style={{alignItems: 'center', paddingTop: 15}}>
              <Text style={styles.title}>{I18n.t('selectCustomer.title')}</Text>
            </View>

            <View style={styles.body}>
              <FlatList
                style={styles.listView}
                data={searchedItems}
                keyExtractor={(item, index) => String(index)}
                ItemSeparatorComponent={() => (<View style={{height: 1}} />)}
                renderItem={({index, item}) => (
                  <Touchable
                    onPress={() => this._selectItem(item)}>
                    <View style={styles.listItem}>
                      <Text style={styles.listItemText}>
                        {_.startCase(item['Firstname'] + ' ' + item['Lastname'])}
                      </Text>
                      {
                        selectedCustomerId === item.Id ? (
                          <Image source={require('../../assets/icons/radio-button-checked.png')}/>
                        ) : (
                          <Image source={require('../../assets/icons/radio-button.png')}/>
                        )
                      }
                    </View>
                  </Touchable>
                )}/>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 15}}>
          <View style={styles.buttonContainer}>
            <BorderButton
              onPress={this._onPressClose}
              title={I18n.t('button.abort')}/>
          </View>
          <View style={{width: 15}}/>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this._confirmSelection}
              disabled={!selectedCustomerId}
              title={I18n.t('button.select')}/>
          </View>
        </View>
      </Screen>
    );
  }
}

export default SelectCustomerScreen;
