import { StyleSheet, Dimensions } from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 0,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
    flex: 1,
    marginTop: 50,
    marginBottom: 15
  },
  headerIconContainer: {
    marginTop: -46,
    alignSelf: 'center'
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  closeButton: {
    padding: 15
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 15
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: COLOR.TEXT_PRIMARY_1
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center',
    lineHeight: 23
  },
  descriptionBold: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center',
    lineHeight: 23
  },
  buttonNegative: {
    backgroundColor: COLOR.BUTTON_1
  }
});
