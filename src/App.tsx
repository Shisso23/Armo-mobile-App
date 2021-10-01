import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import NavigationContainer from './navigation/root.navigator';
import { initAppAction } from './reducers/app-reducer/app.actions';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAppAction());
  });

  return <NavigationContainer />;
};

export default App;
