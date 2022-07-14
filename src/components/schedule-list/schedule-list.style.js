import {StyleSheet} from 'react-native';
import {COLOR} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 330,
  },
  contentContainer: {
    overflow: 'hidden',
    marginHorizontal: 2.5,
  },
  header: {
    backgroundColor: COLOR.LIST_HEADER,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingVertical: 5,
  },
  headerToday: {
    backgroundColor: COLOR.CURRENT_DATE,
  },
  headerContenrContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1,
  },
  headerTextSecondLine: {
    marginTop: -8,
  },
  list: {
    flex: 1,
    width: 160,
  },
  listItem: {
    height: 70,
    borderRadius: 3,
    backgroundColor: COLOR.CARD_BACKGROUND,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  emptyItem: {
    height: 70,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: COLOR.EMPTY_CALENDAR,
  },
  listItemLeftBar: {
    width: 5,
  },
  planned: {
    backgroundColor: COLOR.JOB_PLANNED,
  },
  unplanned: {
    backgroundColor: COLOR.JOB_UNPLANNED,
  },
  started: {
    backgroundColor: COLOR.JOB_STARTED,
  },
  finished: {
    backgroundColor: COLOR.JOB_FINISHED,
  },
  noshow: {
    backgroundColor: COLOR.JOB_NO_SHOW,
  },
  cancelled: {
    backgroundColor: COLOR.JOB_CANCELLED,
  },
  empty: {
    backgroundColor: COLOR.JOB_EMPTY,
  },
  listItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingTop: 7,
    paddingBottom: 1,
  },
  listItemPrimaryText: {
    marginTop: -10,
    marginBottom: -4,
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
  },
  listItemSecondaryText: {
    marginTop: -8,
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1,
  },
  separator: {
    height: 5,
  },
});
