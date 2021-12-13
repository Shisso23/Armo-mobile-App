import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs([
      'Require cycle',
      'VirtualizedLists should never be nested',
      'Usage of "messaging().registerDeviceForRemoteMessages()" is not required.',
      'Non-serializable values were found in the navigation state',
    ]);
    dispatch(initAppAction());
  });

  return <NavigationContainer />;
};

export default App;
