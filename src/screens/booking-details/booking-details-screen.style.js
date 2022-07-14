import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  body: {
    paddingHorizontal: 10,
    position:'relative'
  },
  bodyContentContainer: {
    flexGrow: 1,
    paddingVertical: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 14,
    paddingTop: 14 + 5,
    zIndex: 2,
  },
  bookingContainer: {
    flex: 1,
  },
  toast:{
  }
});
