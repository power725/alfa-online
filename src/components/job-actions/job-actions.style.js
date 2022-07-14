import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 20
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    height: 40,
    backgroundColor: COLOR.BUTTON_1
  },
  buttonPositive: {
    height: 40,
    backgroundColor: COLOR.BUTTON_2
  }
});
