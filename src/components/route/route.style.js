import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
  },
  row: {
    height: 23,
    flexDirection: 'row',
  },
  graphContainer: {
    marginRight: 8,
    alignItems: 'center'
  },
  graphLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLOR.BAR_BACKGROUND_2
  },
  graphEmptyLine: {
    backgroundColor: 'transparent'
  },
  graphPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLOR.BAR_BACKGROUND_2,
  },
  graphPointCompleted: {
    backgroundColor: COLOR.BAR_BACKGROUND_2
  },
  textContainer: {
    flexShrink: 1,
    justifyContent: 'center'
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  iconContainer: {
    marginLeft: 8,
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 26
  }
});
