import { StyleSheet } from 'react-native';
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
  section: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    marginTop: 2,
    paddingHorizontal: 15,
  },
  flex1: {
    flex: 1,
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
  textSmall: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.TEXT_PRIMARY_1,
    marginTop: -10
  },
  spaceBetween: {
    justifyContent: 'space-between'
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
  },
  loadingSection: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10
  },
  margin15: {
    marginHorizontal: 15
  }
});
