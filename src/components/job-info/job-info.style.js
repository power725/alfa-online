import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  timeType: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1
  },
  infoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -14.5,
    marginBottom: 3.5
  },
  flexShrink1: {
    flexShrink: 1
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  infoTitle: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: COLOR.TEXT_PRIMARY_1,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 20
  },
  delay: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 20,
    color: COLOR.JOB_DELAY
  },
  delaySmall: {
    flexShrink: 1,
    marginLeft: 7,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: COLOR.TEXT_PRIMARY_1
  },
  tagContainer: {
    marginTop: 6,
    backgroundColor: COLOR.BAR_BACKGROUND_2,
    borderRadius: 3,
    paddingHorizontal: 5,
    marginLeft: 9,
    height: 23
  },
  tagText: {
    fontSize: 14,
    color: COLOR.TEXT_SECONDARY_1
  }
});
