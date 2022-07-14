import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  View
} from 'react-native';
import {
  Button,
  BorderButton,
  Loader,
  Screen,
  Text,
  Touchable
} from '@components';
import { Navigation } from 'react-native-navigation';
import styles from './settings-screen.style';
import { Format } from '@helpers';
import { pushScreen as pushScreenCreator } from '@helpers';
import I18n from '@locales';
const pushScreen = pushScreenCreator();

class SettingsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state = {
    isLoading: false,
    invoice: null
  };

  componentDidMount() {
    this.props.getNextInvoice()
      .then(response => {
        this.setState({ invoice: response.data });
      })
      .catch(error => {

      })
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _navigateToUserProfileScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'userProfileScreen',
      }
    });
  }

  _navigateToUserNotificationsScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'notificationSettingsScreen',
      }
    });
  }

  _navigateToNotificationsScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'notificationsScreen',
      }
    });
  }

  _navigateToUserAddressesScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'userAddressesScreen',
      }
    });
  }

  _navigateToSessionsScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'sessions',
      }
    });
  }

  _navigateToContactScreen = () => {
    pushScreen(this.props.componentId, {
      component: {
        name: 'contactScreen',
      }
    });
  }

  _attemptLogout = () => {
    Navigation.showOverlay({
      component: {
        name: 'confirmationModal',
        passProps: {
          title: I18n.t('logout.title'),
          message: I18n.t('logout.description'),
          confirmText: I18n.t('logout.yes'),
          cancelText: I18n.t('logout.no'),
          onConfirm: componentId => this._logout(componentId),
          onCancel: componentId => Navigation.dismissOverlay(componentId),
        }
      }
    });
  }

  _logout = overlayComponentId => {
    this.props.closeCustomerSession()
      .catch(error => {});
    this.props.logout();
    Navigation.dismissOverlay(overlayComponentId);
  }

  render() {
    const { user: { data: currentUser }, user: { activeProfile } } = this.props;
    const { isLoading, invoice } = this.state;

    if (!currentUser || !activeProfile)
      return null;

      //         Id: 1
      // InvoiceTimestamp: "2018-12-31T13:56:47.7498288+01:00"
      // ResponseStatus: null
      // // SumFriendly: "103.5 SEK"

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('settings.title')}</Text>
        </View>
        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>

          {
            invoice ? (
              <View>
                <View style={styles.invoiceHeader}>
                  <Text style={styles.invoiceHeaderText}>{I18n.t('settings.nextInvoice')}</Text>
                  <Image source={require('../../assets/icons/chevron.png')}/>
                </View>
                <View style={styles.invoiceBody}>
                  <View style={styles.invoiceBodyRow}>
                    <Text style={styles.invoiceBodyLabel}>{I18n.t('placeholder.date')}{':'}</Text>
                    <Text style={styles.invoiceBodyValue}>{Format.date(invoice.InvoiceTimestamp, 'YYYY-MM-DD')}</Text>
                  </View>
                  <View style={[styles.invoiceBodyRow, styles.invoiceBodyBottomRow]}>
                    <Text style={styles.invoiceBodyLabel}>{I18n.t('placeholder.sum')}{':'}</Text>
                    <Text style={styles.invoiceBodyValue}>{invoice.SumFriendly.split(' ')[0]} <Text style={styles.invoiceBodyLabel}>{invoice.SumFriendly.split(' ')[1]}</Text></Text>
                  </View>
                </View>
              </View>
            ) : null
          }


          <View style={styles.menu}>
            <Touchable onPress={this._navigateToUserProfileScreen}>
              <View style={[styles.menuItem, styles.menuItemTop]}>
                <Text style={styles.menuItemText}>{I18n.t('settings.user')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>

            <Touchable disabled={currentUser.Id !== activeProfile.Id} onPress={this._navigateToUserNotificationsScreen}>
              <View style={[styles.menuItem, currentUser.Id !== activeProfile.Id ? styles.menuItemDisabled : null]}>
                <Text style={styles.menuItemText}>{I18n.t('settings.notificationSettings')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>

            <Touchable disabled={currentUser.Id !== activeProfile.Id} onPress={this._navigateToNotificationsScreen}>
              <View style={[styles.menuItem, currentUser.Id !== activeProfile.Id ? styles.menuItemDisabled : null]}>
                <Text style={styles.menuItemText}>{I18n.t('settings.notifications')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>

            <Touchable onPress={this._navigateToUserAddressesScreen}>
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{I18n.t('settings.myAddresses')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>

            {
              /*
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{'Agent'}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
              */
            }

            <Touchable onPress={this._navigateToContactScreen}>
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{I18n.t('settings.contact')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>

            <Touchable onPress={this._navigateToSessionsScreen}>
              <View style={[styles.menuItem, styles.menuItemBottom]}>
                <Text style={styles.menuItemText}>{I18n.t('settings.sessions')}</Text>
                <Image style={styles.greyChevron} source={require('../../assets/icons/chevron.png')}/>
              </View>
            </Touchable>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <BorderButton
              textStyle={styles.backButtonText}
              title={I18n.t('button.back')}
              onPress={this._navigateToPreviousScreen}/>
          </View>

        </View>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default SettingsScreen;
