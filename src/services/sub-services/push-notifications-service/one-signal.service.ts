import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';
import _ from 'lodash';

import config from '../../../config';
import FlashService from '../flash-service/flash.service';

const pushNotificationsAllowed = async () => {
  return await OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    return response;
  });
};

const getAndSetToken = async () => {
  let oneSignalToken = await AsyncStorage.getItem(config.oneSignalTokenKey);
  const enabled = await pushNotificationsAllowed();

  if (enabled) {
    if (!oneSignalToken) {
      try {
        oneSignalToken = (await OneSignal.getDeviceState()).pushToken;
      } catch (e) {
        oneSignalToken = null;
      }
      if (oneSignalToken) {
        await AsyncStorage.setItem(`${config.oneSignalTokenKey}`, `${oneSignalToken}`);
      }
    }
  }
  return oneSignalToken;
};

const processMessage = async (remoteMessage: Object) => {
  const title = _.get(remoteMessage, 'notification.title', 'Armo');
  const body = _.get(remoteMessage, 'notification.body', '');
  FlashService.inbox(title, body);
};

export default {
  getAndSetToken,
  pushNotificationsAllowed,
  processMessage,
};
