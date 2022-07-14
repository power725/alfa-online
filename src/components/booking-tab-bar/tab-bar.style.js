import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  tab: {
    height: 55,
    width: 103,
    marginRight: 2,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: COLOR.CARD_BACKGROUND_2,
    overflow: 'hidden'
  },
  tabSelected: {
    height: 57,
    width: 103,
    marginRight: 2,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: COLOR.CARD_BACKGROUND,
    overflow: 'hidden',
  },
  statusBar: {
    height: 5
  },
  planned: {
    backgroundColor: COLOR.JOB_PLANNED
  },
  unplanned: {
    backgroundColor: COLOR.JOB_UNPLANNED
  },
  started: {
    backgroundColor: COLOR.JOB_STARTED
  },
  finished: {
    backgroundColor: COLOR.JOB_FINISHED
  },
  noshow: {
    backgroundColor: COLOR.JOB_NO_SHOW
  },
  cancelled: {
    backgroundColor: COLOR.JOB_CANCELLED
  },
  iconColumn: {
    justifyContent: 'center',
    paddingHorizontal: 7
  },
  textColumn: {
    justifyContent: 'center'
  },
  textPrimary: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    width:70,
    color: COLOR.TEXT_PRIMARY_1
  },
  textSecondary: {
    marginTop: -5,
    fontSize: 14,
    lineHeight: 18  ,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1
  },
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row'
  }
});
