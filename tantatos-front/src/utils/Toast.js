import Toast from 'react-native-simple-toast';

export const ToastMessage = message => {
  console.log('pasa ',message)
  Toast.show(message, Toast.SHORT);
};
