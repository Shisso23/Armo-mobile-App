import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import useTheme from '../../theme/hooks/useTheme';
import { AppStackList, DrawerList } from './types';
import BackButton from '../../components/atoms/back-button';
import { Colors } from '../../theme/Variables';
import CreatePostScreen from '../../screens/app/create-post/create-post-screen';
import ReplyToPostScreen from '../../screens/app/reply-to-post/reply-to-post.screen';
import ServicesScreen from '../../screens/app/services/services.screen';
import ForumsScreen from '../../screens/app/forums/forums.screen';
import DrawerContent from '../../components/atoms/drawer/drawe.content';
import { StyleSheet } from 'react-native';

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();

const AppNavigator = () => {
  const { Custom } = useTheme();
  return (
    <AppStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions}>
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Forums"
        component={ForumsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.white, shadowColor: Colors.transparent },
          title: '',
        }}
      />

      <AppStack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="ReplyToPost"
        component={ReplyToPostScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = ({ navigation }: { navigation: any }) => {
  const { Custom } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={Custom.globalNavigatorScreenOptions}
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={styles.drawer}
    >
      <Drawer.Screen
        name="Home"
        component={ForumsScreen}
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
};

const styles = StyleSheet.create({
  drawer: { width: '85%' },
});
export default AppNavigator;
