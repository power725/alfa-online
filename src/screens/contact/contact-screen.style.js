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
    flex: 1
  },
  bodyContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80
  },
  sectionTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: COLOR.HEADER_1,
    padding: 8
  },
  sectionMiddle: {
    marginTop: 2,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    padding: 15
  },
  formGroup: {

  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    color: COLOR.TEXT_PLACEHOLDER,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_PRIMARY_1,
    lineHeight: 24,
    marginBottom: -5,
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
