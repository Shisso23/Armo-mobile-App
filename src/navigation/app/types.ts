import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackList = {
  'App Home': undefined;
  ReplyToPost: undefined;
  EditPost: undefined;
  CreatePost: undefined;
  Services: undefined;
  MyPosts: undefined;
  ViewPost: undefined;
  EditComment: undefined;
  Notifications: undefined;
  ViewPostMedia: undefined;
};
export type AppStackProps = StackNavigationProp<AppStackList>;

export type DrawerList = {
  Home: undefined;
  Profile: undefined;
  Sponsors: undefined;
  MyPosts: undefined;
};
export type DrawerStackProps = StackNavigationProp<DrawerList>;
