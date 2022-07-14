import { Dimensions, StyleSheet } from 'react-native';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    flex: 1,
    paddingHorizontal: 10,
  },
  bodyContentContainer: {
    paddingVertical: 11,
    paddingBottom: 80
  },
  sectionTitle: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1,
    marginLeft: 6
  },
  sectionTop: {
    height: 50,
    backgroundColor: COLOR.TAB_BACKGROUND,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingHorizontal: 15,
  },
  section: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    marginTop: 2,
    paddingHorizontal: 15,
  },
  sectionComplete: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    marginTop: 2,
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  sectionTextSmall: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1,
    marginTop: -15
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  calendarWeek: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 8
  },
  calendarWeekText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOR.TEXT_PRIMARY_1,
    width: (SCREEN_WIDTH - 110) / 7,
    textAlign: 'center'
  },
  calendarDateContainer: {
    paddingHorizontal: 15
  },
  calendarDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calendarDate: {
    width: (SCREEN_WIDTH - 110) / 7,
    height: (SCREEN_WIDTH - 110) / 7 / 1.21875,
    borderRadius: 5,
    backgroundColor: '#F0F2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  calendarDateActive: {
    backgroundColor: COLOR.CALENDAR_DATE_ACTIVE
  },
  calendarDateSelected: {
    backgroundColor: COLOR.CALENDAR_DATE_SELECTED
  },
  calendarDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 80,
    paddingHorizontal: 13,
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
  }
});
