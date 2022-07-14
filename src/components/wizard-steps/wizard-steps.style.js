import { Dimensions, Platform, StyleSheet } from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  stepBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  step: {
    backgroundColor: COLOR.BAR_BACKGROUND,
    height: 14,
    width: 14,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepDone: {
    backgroundColor: COLOR.TAB_BACKGROUND
  },
  stepText: {
    color: COLOR.TEXT_SECONDARY_1,
    fontSize: 12,
    lineHeight: Platform.OS == 'ios' ? 17 : undefined,
    fontWeight: '700'
  },
  stepLine: {
    height: 2,
    backgroundColor: COLOR.BAR_BACKGROUND,
    width: 40
  }
});
