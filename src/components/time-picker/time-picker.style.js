import { Dimensions, StyleSheet } from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 10,
    // justifyContent: 'center'
  },
  bodyContentContainer: {
    paddingTop: 50
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    textAlign: 'center'
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end'
  },
  closeButton: {
    padding: 15,
  },
  sectionTop: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingBottom: 25
  },
  clockIcon: {
    marginTop: -46,
    alignSelf: 'center'
  },
  sectionSelected: {
    borderWidth: 5,
    borderColor: COLOR.BUTTON_BORDER
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15
  },
  flex1: {
    flex: 1
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    marginBottom: -3.5
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.TEXT_PRIMARY_1
  },
  actionIcon: {
    marginBottom: 7,
    marginLeft: 8
  },
  hourContainer: {
    paddingHorizontal: 15,
    height: Math.round((SCREEN_WIDTH - 110) / 6 / 1.4375) * 2 + 10,
    marginVertical: 10
  },
  hourContentContainer: {
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    width: (SCREEN_WIDTH - 110) / 6,
    height: Math.round((SCREEN_WIDTH - 110) / 6 / 1.4375),
    borderRadius: 5,
    backgroundColor: '#F0F2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemActive: {
    backgroundColor: COLOR.CALENDAR_DATE_ACTIVE
  },
  itemSelected: {
    backgroundColor: COLOR.CALENDAR_DATE_SELECTED
  },
  itemText: {
    fontSize: SCREEN_WIDTH <= 320 ? 15 : 18 ,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  },
  sectionBottom: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 25
  },
  minuteContainer: {
    paddingHorizontal: 15,
    paddingTop: 15
  },
  space10: {
    height: 10
  },
  footer: {
    padding: 15
  }
});
