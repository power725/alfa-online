import {StyleSheet} from 'react-native';
// import {COLOR} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainerBackground: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  gradient: {
    height: 100,
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 7.5,
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 7.5,
  },
  buttonBorder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonStartBorder: {
    borderColor: '#00FFAA',
  },
  buttonEndBorder: {
    borderColor: '#00CC88',
  },
  buttonIcon: {
    tintColor: 'white',
  },
  pinIcon: {
    height: 18,
  },
  toast:{
    position:'absolute'
  }
});
