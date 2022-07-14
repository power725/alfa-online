import { Dimensions, StyleSheet } from 'react-native';
import { COLOR } from '@constants';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  contentContainer: {
    borderRadius: 15,
    backgroundColor: COLOR.CARD_BACKGROUND,
    paddingHorizontal: 15,
    marginHorizontal: 15
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    color: COLOR.TEXT_PRIMARY_1
  },
  searchBarContainer: {
    marginTop: 10,
    marginBottom: 19
  },
  searchBar: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    borderRadius: 2,
    paddingHorizontal: 8
  },
  searchBarCancel: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    backgroundColor: '#FFFFFF',
    height: SCREEN_HEIGHT - 400,
  },
  listView: {

  },
  listItem: {
    flexDirection: 'row',
    height: 51,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)'
  },
  listItemText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 30,
  },
  buttonContainer: {
    flex: 1
  }
});
