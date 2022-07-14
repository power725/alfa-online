import {
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: SCREEN_WIDTH <= 320 ? 290 : 340,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center'
  },
  message: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    color: COLOR.TEXT_SECONDARY,
    textAlign: 'center'
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  buttonSpace: {
    width: 15
  }
})
