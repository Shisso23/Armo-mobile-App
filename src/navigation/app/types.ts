import { StackNavigationProp } from '@react-navigation/stack';

export type AppStackList = {
  'App Home': undefined;
};
export type AppStackProps = StackNavigationProp<AppStackList>;

export type DrawerList = {
  Home: undefined;
  Profile: undefined;
};
export type DrawerStackProps = StackNavigationProp<DrawerList>;
