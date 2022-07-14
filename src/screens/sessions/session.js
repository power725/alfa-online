import React, { Component } from 'react';
import {Image, View, Animated, Dimensions } from 'react-native';
import styles from './sessions-screen.style';
import {
    Text,
    Touchable,
} from '@components';
const windowWidth = Dimensions.get('window').width;
export default class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left: new Animated.Value(0)
        };
    }

    animateDelete=()=>{
        Animated.timing(this.state.left, {
            toValue: -windowWidth,
            duration: 1500,
        }).start(({ finished }) => {
            if(finished){
                this.props.deleteSession()
            }
        })
    }
    render() {
        const { text, checkFirstChild, checkLastChild } = this.props
        return (
            <Animated.View style={[styles.menuItem, checkFirstChild, checkLastChild,{left: this.state.left}]}>
                <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemText}>
                        {text}
                    </Text>
                    <Touchable style={styles.deleteSessionButton} onPress={()=>this.animateDelete()}>
                        <Image style={styles.greyChevron} source={require('../../assets/icons/cancel-search.png')}/>
                    </Touchable>
                </View>
            </Animated.View>
        );
    }
}
