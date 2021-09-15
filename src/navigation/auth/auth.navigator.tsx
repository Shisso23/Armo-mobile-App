import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../../screens/auth/sign-in/sign-in.screen';
import ForgotPasswordScene from '../../screens/auth/forgot-password/forgot-password.screen';
import SignUpScreen from '../../screens/auth/sign-up/sign-up.screen';
import BackButton from '../../components/atoms/back-button';
import useTheme from '../../theme/hooks/useTheme';

import { AuthStackList } from './types';
import ResetPasswordScreen from '../../screens/auth/reset-password/reset-password.screen';

const AuthStack = createStackNavigator<AuthStackList>();

const AuthNavigator = ({ navigation }: { navigation: { goBack: Function } }) => {
  const { Custom, Colors } = useTheme();
  return (
    <AuthStack.Navigator screenOptions={Custom.globalNavigatorScreenOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScene}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <BackButton onBack={navigation.goBack} />,
          headerStyle: {
            backgroundColor: Colors.transparent,
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
