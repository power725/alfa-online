import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR } from '@constants';
import { FontHelper } from '@helpers';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  invalidTextInput: {
    borderWidth: 1,
    borderColor: COLOR.WARNING,
  },
  container: {
    borderRadius: 5,
    height: 56,
    backgroundColor: COLOR.CARD_BACKGROUND,
    borderColor: COLOR.SEARCH_INPUT_BORDER,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 16.96,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: 'space-between'
  },
  placeholderContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row'
  },
  placeholder: FontHelper({
    paddingLeft: 1,
    color: COLOR.TEXT_PLACEHOLDER
  }),
  required: {
    color: COLOR.WARNING
  },
  prefix: {
    flex: 0,
    marginRight: 1
  },
  inputFieldContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20
  },
  inputField: FontHelper({
    flex: 1,
    fontSize: 16,
    color: COLOR.TEXT_PRIMARY_2,
    paddingTop: 0,
    paddingBottom: 5,
    paddingBottom: Platform.OS == 'android' ? 2 : 5
  }),
  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 5
  }
});
