import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RegisterLink, ForgotPasswordLink } from '../../../components';

import { FormScreenContainer } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { userAuthService } from '../../../services';

import { signInModel } from '../../../models';
import useTheme from '../../../theme/hooks/useTheme';

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { Gutters, Layout } = useTheme();

  const _onSignInSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };

  return (
    <FormScreenContainer contentContainerStyle={[Layout.scrollCenter]}>
      <View style={Gutters.smallHMargin}>
        <SignInForm
          submitForm={userAuthService.signIn}
          onSuccess={_onSignInSuccess}
          initialValues={signInModel()}
        />
      </View>
      <RegisterLink containerStyle={[Gutters.regularMargin]} />
      <ForgotPasswordLink containerStyle={[Gutters.largeBMargin]} />
    </FormScreenContainer>
  );
};

export default SignInScreen;
