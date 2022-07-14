import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: undefined,
    height: undefined
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    width: SCREEN_WIDTH <= 320 ? 290 : 340,
    paddingHorizontal: 16,
    paddingVertical: 30,
    paddingTop: 0,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
    height: SCREEN_HEIGHT * 2 / 3,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    paddingTop: 15
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
  listView: {
    flex: 1
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 30
  }
});
