import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLOR.BUTTON_BORDER
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 30,
    color: COLOR.BUTTON_BORDER
  }
});
