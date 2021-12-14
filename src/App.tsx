import React, { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { LogBox, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import oneSignalService from './services/sub-services/push-notifications-service/one-signal.service';
import { getUnreadNotificationsAction } from './reducers/notifications-reducer/notifications.actions';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';
import { notificationsService } from './services';
import { RootReducer } from './reducers/types';
import config from './config';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((reducer: RootReducer) => reducer.userAuthReducer);
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

  const getUnreadNotifications = async () => {
    return dispatch(getUnreadNotificationsAction());
  };

  const handleNotification = () => {
    oneSignalService.pushNotificationsAllowed().then(() => {
      handleForgroundNotifications();
      handleNotificationOpened();
      oneSignalService.getAndSetToken().then((token: string) => {
        notificationsService.storeDeviceToken(token);
      });
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'Require cycle',
      'VirtualizedLists should never be nested',
      'Usage of "messaging().registerDeviceForRemoteMessages()" is not required.',
      'Non-serializable values were found in the navigation state',
    ]);
    dispatch(initAppAction());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(getUnreadNotifications, 5000);
      handleNotification();
      return () => {
        clearInterval(interval);
      };
    }
  });

  return <NavigationContainer />;
};

export default App;
