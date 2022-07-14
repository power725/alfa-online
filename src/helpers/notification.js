import Snackbar from 'react-native-snackbar';

class Notification {
  static error(message) {
    console.log('message', message);
    Snackbar.show({
      text: message,
      backgroundColor: '#fff',
      textColor: '#EB0745'
    });
  }
}

export {Notification};
