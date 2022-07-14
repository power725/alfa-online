import {
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        position:'absolute',
        top:-80,
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: SCREEN_WIDTH <= 320 ? 290 : 340,
        paddingHorizontal: 19,
        paddingVertical: 5,
        backgroundColor: COLOR.TEXT_SECONDARY_1,
        borderRadius: 15
    },
    message: {
        fontSize: 16,
        fontWeight: '400',
        color: COLOR.JOB_CANCELLED,
        textAlign: 'center'
    },
})
