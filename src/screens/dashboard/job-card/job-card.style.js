import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  placeholderContainer: {
    margin: 20
  },
  infoContainer: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
  },
  infoTopContainer: {
    marginTop: 8,
    marginLeft: 23,
    paddingRight: 23,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_3,
    lineHeight: 23,
  },
  spacer15: {
    height: 14.5
  }
});
