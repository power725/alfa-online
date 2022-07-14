import React, { Component } from 'react';
import {
    View
} from 'react-native';
import {
    Text
} from '@components';
import styles from './toast.style';

class Toast extends Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.message}>{this.props.message}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Toast;
