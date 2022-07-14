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
  body: {
    flex: 1,
  },
  bodyContentContainer: {
    paddingHorizontal: 10

  },
  invoiceHeader: {
    backgroundColor: COLOR.HEADER_1,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    paddingLeft: 15,
    paddingRight: 19.79,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  invoiceHeaderText: {
    marginTop: 3,
    fontSize: 24,
    fontWeight: '800',
    color: COLOR.TEXT_SECONDARY_1
  },
  invoiceBody: {
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
  menu: {
    marginTop: 18
  },
  menuItemTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  menuItemBottom: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  menuItem: {
    marginTop: 2,
    height: 60,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 19.79
  },
  menuItemDisabled: {
    opacity: 0.5
  },
  greyChevron: {
    tintColor: '#A4A8CD'
  },
  menuItemText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
  },
  footer: {
    marginVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 18
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
