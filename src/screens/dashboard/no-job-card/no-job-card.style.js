import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    paddingTop: 25,
    paddingHorizontal: SCREEN_WIDTH <= 320 ? 20 : 35,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15
  },
  spacer26: {
    height: 20
  },
  primaryText: {
    fontSize: SCREEN_WIDTH <= 320 ? 20 : 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_2,
    textAlign: 'center',
    lineHeight: SCREEN_WIDTH <= 320 ? 26 : 30
  },
  flex1: {
    flex: 1,
  },
  marginContainer: {
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 11
  },
  secondaryText: {
    marginTop: 12,
    fontSize: SCREEN_WIDTH <= 320 ? 15 : 18,
    fontWeight: '500',
    lineHeight: 24
  },
  arrowContainer: {
    height: 84,
    alignItems: 'flex-end'
  },
  secondaryTextHighlight: {
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_4
  }
});
