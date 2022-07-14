import React, { Component } from 'react';
import {
  ScrollView,
  Switch,
  View
} from 'react-native';
import {
  BorderButton,
  Button,
  Loader,
  Screen,
  Text
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import styles from './notification-settings-screen.style';
import { COLOR } from '@constants';
import I18n from '@locales';

class NotificationSettingsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor(props) {
    super(props);

    const {
      settings: {
        __type,
        ShareGpsPosition,
        AvailableQuickAddressTypes,
        HideCustomerConnectRequestOption,
        AvailableCustomers,
        ActiveProfile,
        ...settings
      } 
    } = props;

    this.state = {
      ...settings,
      isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      settings: {
        __type,
        ShareGpsPosition,
        AvailableQuickAddressTypes,
        HideCustomerConnectRequestOption,
        AvailableCustomers,
        ActiveProfile,
        ...settings
      } 
    } = nextProps;

    this.setState({
      ...settings
    });
  }

  _navigateToPreviousScreen = () => {
    Navigation.pop(this.props.componentId);
  }

  _submit = () => {
    const {
      isLoading,
      ...settings
    } = this.state;

    this.setState({ isLoading: true });
    var formData = new FormData();

    for (var key in settings) {
      if (settings.hasOwnProperty(key)) {
        formData.append(key, settings[key])
      }
    }

    this.props.updateCustomerSettings(formData)
      .then(response => {
        this.setState({ isLoading: false }, this._navigateToPreviousScreen);
      })
      .catch(error => {
        const {
          settings: {
            __type,
            ShareGpsPosition,
            AvailableQuickAddressTypes,
            HideCustomerConnectRequestOption,
            AvailableCustomers,
            ActiveProfile,
            ...settings
          } 
        } = this.props;

        this.setState({
          ...settings, isLoading: false });
      });
  }

  render() {
    const { customers } = this.props;
    const { isLoading } = this.state;

    return (
      <Screen>
        <View style={styles.header}>
          <Text style={styles.headerText}>{I18n.t('notificationSettings.title')}</Text>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
          <View style={[styles.sectionTop, styles.formGroup]}>
            <Text style={styles.sectionTitle}>{I18n.t('notificationSettings.mySettings')}</Text>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobStarted')}</Text>
            <Switch value={this.state.Notification_JobStarted} onValueChange={(Notification_JobStarted) => this.setState({Notification_JobStarted})}/>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobFinished')}</Text>
            <Switch value={this.state.Notification_JobFinished} onValueChange={(Notification_JobFinished) => this.setState({Notification_JobFinished})}/>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobCancelled')}</Text>
            <Switch value={this.state.Notification_JobCancelled} onValueChange={(Notification_JobCancelled) => this.setState({Notification_JobCancelled})}/>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobNoShowed')}</Text>
            <Switch value={this.state.Notification_JobNoShowed} onValueChange={(Notification_JobNoShowed) => this.setState({Notification_JobNoShowed})}/>
          </View>

          <View style={[styles.sectionMiddle, styles.formGroup]}>
            <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobDelayed')}</Text>
            <Switch value={this.state.Notification_JobDelayed} onValueChange={(Notification_JobDelayed) => this.setState({Notification_JobDelayed})}/>
          </View>

          {
            customers.length > 0 ? (
              <View style={{marginTop: 15}}>
                <View style={[styles.sectionTop, styles.formGroup]}>
                  <Text style={styles.sectionTitle}>{I18n.t('notificationSettings.customerSettings')}</Text>
                </View>
                <View style={[styles.sectionMiddle, styles.formGroup]}>
                  <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobStarted')}</Text>
                  <Switch value={this.state.CustomerConnect_NotifStarted} onValueChange={(CustomerConnect_NotifStarted) => this.setState({CustomerConnect_NotifStarted})}/>
                </View>

                <View style={[styles.sectionMiddle, styles.formGroup]}>
                  <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobFinished')}</Text>
                  <Switch value={this.state.CustomerConnect_NotifFinished} onValueChange={(CustomerConnect_NotifFinished) => this.setState({CustomerConnect_NotifFinished})}/>
                </View>

                <View style={[styles.sectionMiddle, styles.formGroup]}>
                  <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobCancelled')}</Text>
                  <Switch value={this.state.CustomerConnect_NotifCancelled} onValueChange={(CustomerConnect_NotifCancelled) => this.setState({CustomerConnect_NotifCancelled})}/>
                </View>

                <View style={[styles.sectionMiddle, styles.formGroup]}>
                  <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobNoShowed')}</Text>
                  <Switch value={this.state.CustomerConnect_NotifNoShowed} onValueChange={(CustomerConnect_NotifNoShowed) => this.setState({CustomerConnect_NotifNoShowed})}/>
                </View>

                <View style={[styles.sectionBottom, styles.formGroup]}>
                  <Text style={styles.invoiceBodyLabel}>{I18n.t('notificationSettings.jobDelayed')}</Text>
                  <Switch value={this.state.CustomerConnect_NotifDelayed} onValueChange={(CustomerConnect_NotifDelayed) => this.setState({CustomerConnect_NotifDelayed})}/>
                </View>
              </View>
            ) : null
          }

        </ScrollView>

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
            <Button
              onPress={this._submit}
              gradient={false}
              style={styles.buttonLogOff}
              title={I18n.t('button.update')}/>
          </View>

        </LinearGradient>
        <Loader visible={isLoading}/>
      </Screen>
    );
  }
}

export default NotificationSettingsScreen;
