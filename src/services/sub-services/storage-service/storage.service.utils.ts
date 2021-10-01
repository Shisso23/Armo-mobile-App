import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export function saveItem(key: string, value: any) {
  let saveValue = value;
  if (_.isObject(value)) {
    saveValue = JSON.stringify(value);
  }
  return AsyncStorage.setItem(key, saveValue).catch((error) =>
    // eslint-disable-next-line no-console
    console.warn(`WARNING: Failed to save item with key: ${key}. Error: ${error.message}`),
  );
}

export function getItem(key: string) {
  return AsyncStorage.getItem(key)
    .then((value) => {
      return typeof value === 'string' ? JSON.parse(value) : value;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(`WARNING: Failed to get item with key: ${key}. Error: ${error.message}`);
      return null;
    });
}

export function removeItem(key: string) {
  return AsyncStorage.removeItem(key).catch((error) => {
    // eslint-disable-next-line no-console
    console.warn(`WARNING: Failed to remove item with key: ${key}. Error: ${error.message}`);
    return null;
  });
}
