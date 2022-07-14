import { Dimensions, StyleSheet } from 'react-native';
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
    paddingHorizontal: 16,
    paddingVertical: 30,
    paddingTop: 0,
    // paddingTop: 30,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
    // height: 100,
    // paddingTop: -46
  },
  icon: {
    marginTop: -46,
    alignSelf: 'center',
    marginBottom: 30
  },
  fieldSeparator: {
    height: 8
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  buttonSpace: {
    width: 20
  },
  backButtonText: {
    color: COLOR.TEXT_SECONDARY_1,
    fontWeight: '700'
  },
  buttonLogOff: {
    backgroundColor: COLOR.BUTTON_1
  }
});
