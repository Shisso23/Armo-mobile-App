import { Alert } from 'react-native';

export const promptConfirm = (
  text = '',
  message: string,
  confirmText = 'Confirm',
  onConfirm = () => {},
) => {
  Alert.alert(
    text,
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: confirmText,
        onPress: onConfirm,
      },
    ],
    { cancelable: false },
  );
};
