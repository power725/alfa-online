import {StyleSheet} from 'react-native';
import {COLOR} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholderContainer: {
    margin: 20,
  },
  infoContainer: {
    backgroundColor: COLOR.CARD_BACKGROUND,
  },
  borderTopRadius15: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoTopContainer: {
    marginTop: 18,
    marginLeft: 23,
    paddingRight: 23,
  },
  spacer15: {
    height: 14.5,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  animatedMarkerContainer: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
  },
  marker: {
    height: 50,
    width: 50,
  },
  emptyView: {flex: 1},
});
