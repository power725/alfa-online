import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  contentContainer: {
    marginTop: 46,
    // flex: 1,
    borderRadius: 15,
    backgroundColor: COLOR.CARD_BACKGROUND,
    padding: 15,
    paddingTop: 0
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center',
    marginTop: 5
  }
});
