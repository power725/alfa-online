import { StyleSheet } from 'react-native';
import { COLOR } from '@constants';

export default {
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 90
  },
  activeProfile: {
    fontSize: 14,
    fontWeight: '300',
    color: COLOR.TEXT_SECONDARY_1,
    textAlign: 'center'
  },
  activeProfileBold: {
    fontWeight: '500'
  },
  topBarContainer: {
    flexDirection: 'row'
  },
  activeProfileContainer: {
    flex: 1
  },
  changeButtonContainer: {
    width: 126,
    marginLeft: 8
  },
  changeButton: {
    backgroundColor: COLOR.BUTTON_BORDER,
  },
  topBar: {
    height: 25,
    backgroundColor: COLOR.BAR_BACKGROUND,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bottomContainer: {
    marginTop: 15,
    flex: 1
  },
  listView: {
    flex: 1
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
  tab: {
    flex: 1,
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: COLOR.CARD_BACKGROUND
  },
  button: {
    height: 50,
    backgroundColor: COLOR.BUTTON_BORDER,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.TEXT_SECONDARY_1
  },
  buttonSpace: {
    width: 13
  }
};
