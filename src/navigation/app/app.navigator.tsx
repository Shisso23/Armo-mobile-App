import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/app/profile/profile.screen';
import useTheme from '../../theme/hooks/useTheme';
import { AppStackList, DrawerList } from './types';
import { Colors } from '../../theme/Variables';
import CreatePostScreen from '../../screens/app/create-post/create-post-screen';
import ReplyToPostScreen from '../../screens/app/reply-to-post/reply-to-post.screen';
import ServicesScreen from '../../screens/app/services/services.screen';
import ForumsScreen from '../../screens/app/forums/forums.screen';
import DrawerContent from '../../components/atoms/drawer/drawer.content';
import { StyleSheet } from 'react-native';
import ViewPostScreen from '../../screens/app/forums/view-post.screen';
import Header from '../../components/atoms/header';
import EditPostScreen from '../../screens/app/edit-post/edit-post-screen';
import EditCommentScreen from '../../screens/app/edit-comment/edit-comment.screen';
import NotificationsScreen from '../../screens/app/notifications/notifications.screen';
import SponsorsScreen from '../../screens/app/sponsors/sponsors.screen';

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();

const AppNavigator = ({ navigation }: { navigation: any }) => {
  const { Custom } = useTheme();
  return (
    <AppStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions} headerMode="screen">
      <AppStack.Screen
        name="App Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ReplyToPost"
        component={ReplyToPostScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="EditComment"
        component={EditCommentScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="ViewPost"
        component={ViewPostScreen}
        options={{
          header: (props) => <Header onBack={() => navigation.goBack()} {...props} backButton />,
        }}
      />

      <AppStack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ headerShown: false }}
      />

      <AppStack.Screen
        name="Forums"
        component={ForumsScreen}
        options={{
          headerShown: true,
          header: (props) => (
            <Header onBack={() => navigation.goBack()} backButton={false} {...props} />
          ),
          title: '',
        }}
      />

      <AppStack.Screen
        name="Notifications"
        component={NotificationsScreen}
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
          header: (props) => <Header onBack={() => navigation.goBack()} {...props} />,
          headerStyle: {
            backgroundColor: Colors.transparent,
          },
        }}
      />
      <Drawer.Screen
        name="Sponsors"
        component={SponsorsScreen}
        options={{
          headerShown: false,
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
