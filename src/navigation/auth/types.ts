import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

export type AuthStackProps = StackNavigationProp<AuthStackList>;
