import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './auth/auth.navigator';
import AppNavigator from './app/app.navigator';

import { RootReducer } from '../reducers/types';

const RootStack = createStackNavigator();

const AppContainer: React.FC = () => {
  const { isAuthenticated } = useSelector((reducer: RootReducer) => reducer.userAuthReducer);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="APP" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="AUTH" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
