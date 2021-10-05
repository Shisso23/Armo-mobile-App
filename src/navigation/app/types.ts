import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackList = {
  'App Home': undefined;
  ReplyToPost: undefined;
  CreatePost: undefined;
  Services: undefined;
  Forums: undefined;
  ViewPost: undefined;
};
export type AppStackProps = StackNavigationProp<AppStackList>;

export type DrawerList = {
  Home: undefined;
  Profile: undefined;
};
export type DrawerStackProps = StackNavigationProp<DrawerList>;
