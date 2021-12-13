import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import useTheme from '../../theme/hooks/useTheme';
import { AppStackList, DrawerList } from './types';
import { Colors } from '../../theme/Variables';
import CreatePostScreen from '../../screens/app/create-post/create-post-screen';
import ReplyToPostScreen from '../../screens/app/reply-to-post/reply-to-post.screen';
import ServicesScreen from '../../screens/app/services/services.screen';
import ForumsScreen from '../../screens/app/forums/forums.screen';
import DrawerContent from '../../components/atoms/drawer/drawer.content';
import { StyleSheet } from 'react-native';
import ViewPostScreen from '../../screens/app/view-post/view-post.screen';
import Header from '../../components/atoms/header';
import EditPostScreen from '../../screens/app/edit-post/edit-post-screen';
import EditCommentScreen from '../../screens/app/edit-comment/edit-comment.screen';
import NotificationsScreen from '../../screens/app/notifications/notifications.screen';
import SponsorsScreen from '../../screens/app/sponsors/sponsors.screen';
import ViewPostMediaScreeen from '../../screens/app/view-post-media/view-post-media.screen';
import MyPostsScreen from '../../screens/app/my-posts/my-posts.screen';
import MySubscriptionsScreen from '../../screens/app/my-subscriptions/my-subscriptions.screen';

const AppStack = createStackNavigator<AppStackList>();
const Drawer = createDrawerNavigator<DrawerList>();

const AppNavigator = ({ navigation }: { navigation: any }) => {
  const { Custom } = useTheme();

  const goBack = () => navigation.goBack();
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
          header: (props) => <Header onBack={goBack} {...props} backButton />,
        }}
      />

      <AppStack.Screen
        name="Services"
        component={ServicesScreen}
        options={{ headerShown: false }}
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
      <AppStack.Screen
        name="ViewPostMedia"
        component={ViewPostMediaScreeen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

const DrawerNavigator = ({ navigation }: { navigation: any }) => {
  const { Custom } = useTheme();
  const goBack = () => navigation.goBack();
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
          header: (props) => <Header onBack={goBack} {...props} />,
          headerStyle: {
            backgroundColor: Colors.transparent,
          },
        }}
      />
      <AppStack.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={{
          headerShown: true,
          title: '',
          header: (props) => <Header engagementScoreVisible={false} onBack={goBack} {...props} />,
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
        name="MySubscriptions"
        component={MySubscriptionsScreen}
        options={{
          headerShown: true,
          title: '',
          header: (props) => <Header engagementScoreVisible={false} onBack={goBack} {...props} />,
          headerStyle: {
            backgroundColor: Colors.transparent,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: { width: '85%' },
});
export default AppNavigator;
