import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default StyleSheet.create({
  body: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyContentContainer: {
    paddingVertical: 11,
    paddingHorizontal: 10,
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
    alignItems: 'center',
    paddingHorizontal: 15
  },
  sectionResult: {
    backgroundColor: COLOR.HEADER_1
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    marginTop: 2,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  secondLineText: {
    marginTop: -5
  },
  sectionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  sectionTextSmall: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: COLOR.TEXT_PRIMARY_1,
    // marginTop: -3
  },
  textWarning: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: COLOR.WARNING,
  },
  sectionTextLarge: {
    fontSize: 32,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    marginTop: -12
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  separator: {
    height: 1,
    backgroundColor: COLOR.SEPARATOR_3,
    marginVertical: 10
  },
  noteContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noteIcon: {
    tintColor: 'white',
    height: 8,
    width: 10,
    marginBottom: 1
  },
  noteText: {
    color: 'white',
    marginHorizontal: 8
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoIcon: {
    marginRight: 8,
    marginBottom: 5
  },
  flex1: {
    flex: 1
  },
  space10: {
    height: 10
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
  buttonContainerLarge: {
    flex: 2
  },
  buttonSpace: {
    width: 20
  },
  backButtonText: {
    color: COLOR.TEXT_SECONDARY_1,
    fontWeight: '700'
  },
});
