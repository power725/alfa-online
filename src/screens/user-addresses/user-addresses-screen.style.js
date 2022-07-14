import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  header: {
    height: 51,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  },
  body: {
    flex: 1
  },
  addressList: {
    flex: 1
  },
  addressListContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80
  },
  addressItem: {
    flexDirection: 'row',
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  addressIconColumn: {
    justifyContent: 'center'
  },
  flex1: {
    flex: 1
  },
  addressItemRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressChevron: {
    tintColor: '#A4A8CD'
  },
  addressItemSeparator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  addressFullText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLOR.TEXT_SECONDARY_2,
    lineHeight: 20,
    // marginTop: -4
  },
  addressCategoryContainer: {
    borderRadius: 2,
    marginLeft: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR.ADDRESS_CATEGORY
  },
  addressCategory: {
    fontSize: 12,
    fontWeight: '500',
    color: COLOR.TEXT_SECONDARY_1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 13,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  buttonSpace: {
    width: 20
  },
  backButtonText: {
    color: COLOR.TEXT_SECONDARY_1,
    fontWeight: '700'
  },
  buttonLogOff: {
    backgroundColor: COLOR.BUTTON_1
  }
});
