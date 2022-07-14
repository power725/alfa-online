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
  sectionTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: COLOR.CARD_BACKGROUND,
    padding: 15,
    // paddingVertical: 15
  },
  sectionMiddle: {
    marginTop: 2,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingLeft: 14,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  sectionBottom: {
    marginTop: 2,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 14,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  invoiceBodyLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1
  },
  invoiceBodyValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
  },
  invoiceBodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  invoiceBodyBottomRow: {
    marginTop: -5
  },
  legitimationValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.TEXT_PRIMARY_1,
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
  buttonLogOff: {
    backgroundColor: COLOR.BUTTON_1
  }
});
