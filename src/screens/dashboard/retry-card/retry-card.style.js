import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  infoContainer: {
    paddingVertical: 25,
    paddingHorizontal: SCREEN_WIDTH <= 320 ? 20 : 35,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
    height: 200
  },
  primaryText: {
    fontSize: SCREEN_WIDTH <= 320 ? 20 : 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_2,
    textAlign: 'center',
    lineHeight: SCREEN_WIDTH <= 320 ? 26 : 30
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    width: 75,
    height: 65
  },
  button: {
    width: 100,
    height: 40
  }
});
