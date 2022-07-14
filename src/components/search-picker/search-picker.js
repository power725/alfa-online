import React, {Component} from 'react';
import {
  View,
  Modal,
} from 'react-native';
import _ from 'lodash';
import {
  SearchScreen,
  SearchInput,
  TouchableField 
} from '@components';

class SearchPicker extends Component {
  state = {
      pickerVisible: false,
  }

  showPicker = () => {
    this.setState({
      pickerVisible: true,
    });
  }

  _hidePicker = () => {
    this.setState({
      pickerVisible: false
    });
  }

  _onItemSelected = (selectedItem) => {
    this.props.onValueChange && this.props.onValueChange(selectedItem);
    this.setState({ pickerVisible: false });

    if (this.props.onClosePicker)
      this.props.onClosePicker();
  }

  render() {
    var {selectedItem, displayKey, errorText, placeholder, required} = this.props;
    var label = selectedItem && displayKey && selectedItem[displayKey];

    return (
      <View>
        <TouchableField
          errorText={errorText}
          onPress={this.showPicker}
          placeholder={placeholder}
          required={required}
          value={label}
          />
        <Modal
          animationType="fade"
          transparent
          visible={this.state.pickerVisible}
          onRequestClose={this._hidePicker}>
          <SearchScreen
            onItemPress={this._onItemSelected}
            onClosePress={this._hidePicker}
            dataSource={this.props.items}
            title={placeholder}
            displayKey={displayKey}/>
        </Modal>
      </View>
    );
  }
}

export default SearchPicker;
