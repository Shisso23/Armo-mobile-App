import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/app/home/home.screen';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import useTheme from '../../theme/hooks/useTheme';

import { AppStackList, DrawerList } from './types';
import BackButton from '../../components/atoms/back-button';
import { Colors } from '../../theme/Variables';
import CreatePostScreen from '../../screens/app/create-post/create-post-screen';

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();

const AppNavigator = () => {
  const { Custom } = useTheme();
  return (
    <AppStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions}>
      {/* <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      /> */}
      <AppStack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = ({ navigation }: { navigation: any }) => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true,
        title: '',
        headerLeft: () => <BackButton onBack={navigation.goBack} />,
        headerStyle: {
          backgroundColor: Colors.transparent,
        },
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: true, title: 'Profile' }}
    />
  </Drawer.Navigator>
);

export default AppNavigator;
