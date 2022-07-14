import {
  Dimensions,
  StyleSheet
} from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center'
  },
  contentContainer: {
    width: SCREEN_WIDTH <= 320 ? 290 : 340,
    paddingHorizontal: 16,
    paddingVertical: 30,
    paddingTop: 0,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 15,
    flex: 1,
    marginTop: 50,
    marginBottom: 20
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
  listView: {
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  listItemSeparator: {
    height: 1
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 5,
    alignItems: 'center'
  }
});
