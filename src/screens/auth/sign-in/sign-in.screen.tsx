import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { RegisterLink } from '../../../components';

import { FormScreenContainer } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { userAuthService } from '../../../services';
import { signInModel } from '../../../models';
import useTheme from '../../../theme/hooks/useTheme';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { Gutters, Layout, Images } = useTheme();

  const _onSignInSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };

  return (
    <FormScreenContainer contentContainerStyle={[Layout.scrollCenter]}>
      <View
        style={[
          Gutters.regularPadding,
          Layout.alignItemsCenter,
          // Layout.fill,
          Gutters.largeHPadding,
          styles.container,
        ]}
      >
        <Image source={Images.signInTop} style={styles.topImage} />
        <Image source={Images.logo3} style={[styles.image]} />
        <SignInForm
          submitForm={userAuthService.signIn}
          onSuccess={_onSignInSuccess}
          initialValues={signInModel()}
        />
      </View>
      <RegisterLink containerStyle={Gutters.largeTMargin} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
  topImage: { height: width * 1.19, position: 'absolute', top: -width * 0.718, width },
});

export default SignInScreen;
