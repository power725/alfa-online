import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  unreadNotificationBar: {
    backgroundColor: COLOR.WARNING,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0, width: 8
  },
  header: {
    height: 50,
    backgroundColor: COLOR.TAB_BACKGROUND,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1,
    marginLeft: 6
  },
  notification: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden'
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
  },
  notificationTitleUnread: {
    fontSize: 18,
    fontWeight: '900',
    color: COLOR.TEXT_PRIMARY_1,
  },
  notificationTime: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR.TAB_BACKGROUND,
  },
  notificationTextContainer: {
    marginTop: 15
  },
  notificationText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 22
  },
  notificationTextUnread: {
    fontSize: 17,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 22
  },
  button: {
    height: 40,
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
  backButtonText: {
    color: COLOR.TEXT_SECONDARY_1,
    fontWeight: '700'
  },
});
