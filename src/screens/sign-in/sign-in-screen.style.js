import { StyleSheet, Dimensions } from 'react-native';
import { FontHelper } from '@helpers';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContentcontainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    borderRadius: 15,
    backgroundColor: COLOR.CARD_BACKGROUND,
    paddingVertical: 20,
    paddingHorizontal: 35,
    marginHorizontal: 25,
    maxWidth: SCREEN_WIDTH <= 320 ? 290 : 325
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  descriptionLight: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: SCREEN_WIDTH <= 320 ? 17 : 18,
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 4,
    // backgroundColor: 'green'
  },
  descriptionHeavy: {
    color: COLOR.TEXT_PRIMARY_2,
    fontWeight: '700'
  },
  descriptionSmall: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: SCREEN_WIDTH <= 320 ? 13 : 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  verticalSpacer: {
    backgroundColor: COLOR.TEXT_SECONDARY,
    height: 1,
    marginTop: SCREEN_WIDTH <= 320 ? 6 : 14,
    marginBottom: SCREEN_WIDTH <= 320 ? 7 : 15
  },
  spacer17: {
    height: SCREEN_WIDTH <= 320 ? 8 : 17
  },
  spacer20: {
    height: SCREEN_WIDTH <= 320 ? 10 : 20
  },
  descriptionLarge: {
    color: COLOR.TEXT_PRIMARY_2,
    fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 3
  },
  textInput: FontHelper({
    height: 50,
    backgroundColor: COLOR.TEXT_INPUT_BACKGROUND,
    borderRadius: 5,
    fontSize: SCREEN_WIDTH <= 320 ? 25 : 28,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_2,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    textTransform: 'capitalize'
  }),
  invalidTextInput: {
    borderWidth: 1,
    borderColor: COLOR.WARNING,
  },
  errorText: {
    marginTop: 6,
    fontSize: 11,
    color: COLOR.WARNING,
    textAlign: 'center'
  },
  button: {
    width: 200,
    alignSelf: 'center'
  }
});
