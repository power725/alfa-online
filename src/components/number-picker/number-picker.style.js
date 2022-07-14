import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
    width: 108,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  textContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: COLOR.CARD_BACKGROUND_1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  disabled: {
    opacity: 0.5
  }
});
