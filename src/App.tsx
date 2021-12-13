import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';
import config from './config';
import oneSignalService from './services/sub-services/push-notifications-service/one-signal.service';
import { Platform } from 'react-native';

const App: React.FC = () => {
  OneSignal.setLogLevel(6, 0);
  if (Platform.OS === 'android') {
    OneSignal.setAppId(`${config.oneSignalAppId}`);
  } else {
    OneSignal.setAppId(`${config.oneSignalAppIdIos}`);
  }

  const dispatch = useDispatch();

  const handleForgroundNotifications = () =>
    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      let notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
      return oneSignalService.processMessage(notification);
    });

  const handleNotificationOpened = () => {
    return OneSignal.setNotificationOpenedHandler((notification) => {
      oneSignalService.processMessage(notification);
    });
  };

  useEffect(() => {
    oneSignalService.pushNotificationsAllowed().then(() => {
      handleForgroundNotifications();
      handleNotificationOpened();
    });
    dispatch(initAppAction());
  });

  return <NavigationContainer />;
};

export default App;
