import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  listItem: {
    height: 70,
    borderRadius: 3,
    position:'relative',
    backgroundColor: COLOR.CARD_BACKGROUND,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  emptyItem: {
    height: 70,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: COLOR.EMPTY_CALENDAR
  },
  listItemLeftBar: {
    width: 5
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
  empty: {
    backgroundColor: COLOR.JOB_EMPTY
  },
  public:{
    backgroundColor:  COLOR.JOB_PUBLIC
  },
  listItemTextContainer: {
    display:'flex',
    flexDirection:'row',
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 7,
    paddingBottom: 1,
  },
  listItemPrimaryText: {
    marginTop: -10,
    marginBottom: -4,
    fontSize: 22,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  listItemDelayText: {
    marginTop: -10,
    marginBottom: -4,
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.JOB_DELAY
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  listItemSecondaryText: {
    marginTop: -8,
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1,
  },
  vehicleType:{
    width:15,
    height:15,
    marginTop:2
  },
  vehicleTypeAndTimeRow:{
    position:'relative',
    display:'flex',
    width:16,
    justifyContent:'center',
    alignItems:'center',
    marginRight:6
  },
  iconJobContainer:{
    marginBottom:5
  },
  leftBorder:{
    width:1,
    height:40,
  },
  addressContainer:{
    width:'90%',
  },
  borderStatus:{
    position:'absolute',
    width:9,
    height:'100%',
    left:-4,
    zIndex:10,
  },
  alignL:{
    textAlign: 'left'
  },
  info:{
    width:'90%',
    textAlign:'left',
  }
});
