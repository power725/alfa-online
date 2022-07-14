import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
} from 'react-native';
import {
  Screen,
  SearchInput,
  Text,
  Touchable
} from '@components';
import styles from './search-screen.style';
import _ from 'lodash';
import I18n from '@locales';

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchedItems: this.props.dataSource
    }
  }

  _search = _.debounce(() => {
    var {displayKey} = this.props;
    var {searchText} = this.state;

    this.setState({
      searchedItems: _.filter(this.props.dataSource, (listItem) => listItem[displayKey].toLowerCase().includes(searchText.toLowerCase()))
    });
  }, 500);

  render() {
    var { displayKey, onClosePress, title } = this.props;
    var { searchedItems, searchText } = this.state;

    return (
      <Screen>
        <View style={styles.body}>
          <View style={styles.contentContainer}>
            <View style={styles.closeButtonContainer}>
              <Touchable
                accessible={true}
                accessibilityLabel={I18n.t('button.close')}
                onPress={onClosePress}>
                <Image source={require('../../assets/icons/close-modal.png')}/>
              </Touchable>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title }>{title || 'Search'}</Text>
            </View>
            <SearchInput
              autoFocus
              autoCapitalize={'none'}
              onSubmitEditing={this._search}
              value={searchText}
              onChangeText={(searchText) => this.setState({ searchText }, this._search)}
              placeholder={'Search'}/>

            <FlatList
              style={styles.listView}
              data={searchedItems}
              keyExtractor={(item, index) => String(index)}
              ListHeaderComponent={() => (<View style={styles.listItemSeparator} />)}
              ListFooterComponent={() => (<View style={styles.listItemSeparator} />)}
              ItemSeparatorComponent={() => (<View style={styles.listItemSeparator} />)}
              renderItem={({index, item}) => (
                <Touchable
                  onPress={() => this.props.onItemPress && this.props.onItemPress(item)}
                  style={styles.listItem}>
                  <Text style={styles.listItemText}>{item[displayKey]}</Text>
                </Touchable>
              )}/>
          </View>
        </View>
      </Screen>
    );
  }
}

export default SearchScreen
