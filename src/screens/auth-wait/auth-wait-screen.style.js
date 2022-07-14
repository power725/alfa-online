import { Dimensions, StyleSheet } from 'react-native';
import { FontHelper } from '@helpers';
import { COLOR } from '@constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContentcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: COLOR.CARD_BACKGROUND,
    width: SCREEN_WIDTH <= 320 ? 290 : 325,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 46,
    paddingBottom: 20
  },
  descriptionLarge: {
    color: COLOR.TEXT_PRIMARY_2,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 23,
    textAlign: 'center',
    marginVertical: SCREEN_WIDTH <= 320 ? 12.5 : 25,
    marginHorizontal: 25
  },
  button: {
    width: 200,
    alignSelf: 'center'
  },
  spacer10: {
    height: 10
  }
});
