import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 57,
    paddingHorizontal: 10
  },
  contentContainer: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: COLOR.CARD_BACKGROUND
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1
  },
  list: {
    flex: 1
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 70
  },
  itemContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTextContainer: {
    flex: 1
  },
  iconContainer: {
    marginRight: 10
  },
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.TEXT_SECONDARY
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  button: {
    width: 160
  }
});
