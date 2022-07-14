import React, { Component } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Loader,
  TextInput,
  TouchableField,
  SearchPicker,
  Modal
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './add-user-address-modal.style';
import ViewOverflow from 'react-native-view-overflow';
import validator from 'validator';
import I18n from '@locales';
import { Format, Notification } from '@helpers';

class addUserAddressModal extends Component {
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

  constructor(props) {
    super(props);
    const { userAddress } = this.props;

    this.state = {
      name: userAddress ? userAddress.Name : '',
      phoneNumber: userAddress ? userAddress.PhoneNumber : '',
      address: userAddress ? userAddress.Address : null,
      addressCategory: userAddress ? userAddress.AddressCategory : null,
      isLoading: false
    }
  }

  _navigateToPreviousScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  }

  _navigateToSearchAddressScreen = () => {
    Navigation.showModal({
      component: {
        name: 'addressSearchScreen',
        passProps: {
          onSelectAddress: this._onSelectAddress
        }
      }
    });
  }

  _onSelectAddress = (address) => {
    this.setState({ address });
  }

  _submit = () => {
    const {
      name,
      phoneNumber,
      address,
      addressCategory
    } = this.state;
    const { 
      userAddress,
      createCustomerAddress,
      updateCustomerAddress
    } = this.props;

    const errorMessages = [];

    if (!validator.isLength(validator.blacklist(name, ' '), { min: 3 }))
      errorMessages.push(I18n.t('validation.valid.name'));

    if (phoneNumber && !validator.isMobilePhone(phoneNumber))
      errorMessages.push(I18n.t('validation.valid.phoneNumber'));

    if (!address)
      errorMessages.push(I18n.t('validation.required.address'));

    if (!addressCategory)
      errorMessages.push(I18n.t('validation.required.addressCategory'));

    if (errorMessages.length > 0) {
      Notification.error(errorMessages.join('\n'));

      return;
    }

    const addressParams = {
      Name: name,
      Phone: phoneNumber,
      AddressId: address.Id,
      QuickAddressCategory: addressCategory.Id,
    };

    if (userAddress)
      addressParams['Id'] = userAddress['Id'];

    this.setState({ isLoading: true });
    const requestPromise = userAddress ? updateCustomerAddress(addressParams) : createCustomerAddress(addressParams);

    requestPromise
      .then(response => {
        this.setState({ isLoading: false }, this._navigateToPreviousScreen);
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { onCancel, onSave, addressTypes } = this.props;
    const { address, addressCategory, phoneNumber, name, isLoading } = this.state;

    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.icon}>
              <Image source={require('../../assets/icons/location-modal.png')}/>
            </View>

            <View>
              <TouchableField
                required
                value={address ? Format.getFullAddressString(address) : ''}
                placeholder={I18n.t('placeholder.address')}
                onPress={this._navigateToSearchAddressScreen}/>

              <View style={styles.fieldSeparator}/>

              <TextInput
                required
                placeholder={I18n.t('placeholder.alias')}
                value={name}
                onChangeText={(name) => this.setState({ name })}
                validation={(name) => {
                  return validator.isAlpha(validator.blacklist(name, ' ')) && validator.isLength(validator.blacklist(name, ' '), { min: 3 });
                }}/>

              <View style={styles.fieldSeparator}/>

              <TextInput
                placeholder={I18n.t('placeholder.phoneNumber')}
                value={phoneNumber}
                onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                keyboardType={'numeric'}
                validation={(phoneNumber) => {
                  return validator.isMobilePhone(phoneNumber) || !phoneNumber;
                }}/>

              <View style={styles.fieldSeparator}/>

              <SearchPicker
                required
                items={addressTypes}
                displayKey={'Name'}
                placeholder={I18n.t('placeholder.category')}
                onValueChange={(addressCategory) => this.setState({addressCategory})}
                selectedItem={addressCategory}
                />
            </View>
            <View style={styles.footer}>
              <View style={styles.buttonContainer}>
                <BorderButton
                  title={I18n.t('button.abort')}
                  onPress={this._navigateToPreviousScreen}/>
              </View>

              <View style={styles.buttonSpace}/>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={this._submit}
                  gradient={false}
                  style={styles.buttonLogOff} title={I18n.t('button.save')}/>
              </View>
            </View>
          </View>
          <Loader visible={isLoading}/>
        </View>
      </Modal>
    );
  }
}

export default addUserAddressModal;
