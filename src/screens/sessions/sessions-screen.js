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
    Touchable,
    TouchableOpacity
} from '@components';
import { Navigation } from 'react-native-navigation';
import I18n from '@locales';
import moment from "moment"
import styles from './sessions-screen.style';
import Session from "./session";
class SessionsScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    state = {
        isLoading: false,
        invoice: null,
    }

    _navigateToPreviousScreen = () => {
        Navigation.pop(this.props.componentId);
    }
    componentDidMount() {
        this.props.getSessions()
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
        // this.props.logout();
        Navigation.dismissOverlay(overlayComponentId);
    }
    _renderSessions = () =>{
        const {devices} = this.props.sessions
        return devices.map((session,index)=>{
            const {DeviceUuid,OS,OSVersion,DeviceModel,Created} = session
            const date = moment(new Date(Created)).format("HH:mm | DD MMMM | YYYY")
            let checkFirstChild = index === 0 ? styles.menuItemTop : null
            let checkLastChild = index === devices.length-1 ? styles.menuItemBottom : null
            return (<Session
                key={DeviceUuid}
                text={`${OS} ${OSVersion} | ${DeviceModel} | ${date}`}
                deleteSession={()=>this.props.deleteSessionWithoutLoading(DeviceUuid)}
                checkFirstChild={checkFirstChild}
                checkLastChild={checkLastChild}
            />)
        })
    }
    _selectContent = (content) => {
        return <View style={styles.selectContentContainer}>
            <Text style={styles.selectContent}>{content}</Text>
        </View>
    }
    _renderContent = () => {
        const {devices=[],error,loading} = this.props.sessions
        if(loading){
            return this._selectContent(`${I18n.t('sessions.loading')}...`)
        }
        if(!devices.length){
           return this._selectContent(I18n.t('sessions.noSessions'))
        }
        if(error){
            return this._selectContent(I18n.t('sessions.notAvailable'))
        }

        return this._renderSessions()
    }
    render() {
        const { user: { data: currentUser }, user: { activeProfile }, sessions } = this.props;
        const { isLoading, invoice } = this.state;
        if (!currentUser || !activeProfile)
            return null;

        return (
            <Screen>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{I18n.t('sessions.title')}</Text>
                </View>
                <ScrollView style={styles.body} contentContainerStyle={styles.bodyContentContainer}>
                    <View style={styles.menu}>
                        {this._renderContent()}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.buttonContainer}>
                        <BorderButton
                            textStyle={styles.backButtonText}
                            title={I18n.t('button.back')}
                            onPress={this._navigateToPreviousScreen}/>
                    </View>

                    <View style={styles.buttonSpace}/>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this._attemptLogout}
                            gradient={false}
                            style={styles.buttonLogOff}
                            title={I18n.t('button.logOff')}/>
                    </View>
                </View>
                <Loader visible={isLoading}/>
            </Screen>
        );
    }
}


export default SessionsScreen;
