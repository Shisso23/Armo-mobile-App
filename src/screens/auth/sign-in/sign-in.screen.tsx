import React from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { RegisterLink } from '../../../components';
import { FormScreenContainer } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { userAuthService } from '../../../services';
import { signInModel, SignInProps } from '../../../models';
import useTheme from '../../../theme/hooks/useTheme';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { Gutters, Layout, Images } = useTheme();
  const isFocused = useIsFocused();

  const _onSignInSuccess = () => {
    dispatch(isAuthenticatedFlowAction());
  };

  const signIn = async (formData: SignInProps) => {
    await userAuthService.signIn(formData);
  };

  return (
    <>
      {isFocused && <StatusBar hidden />}
      <FormScreenContainer
        contentContainerStyle={[Layout.scrollSpaceAround]}
        enableOnAndroid
        extraHeight={25}
        extraScrollHeight={25}
      >
        <View
          style={[
            Gutters.regularPadding,
            Layout.alignItemsCenter,
            Gutters.largeHPadding,
            styles.container,
          ]}
        >
          <Image source={Images.signInTop} style={styles.topImage} />
          <Image source={Images.logo3} style={[styles.image]} />
          <SignInForm
            submitForm={signIn}
            onSuccess={_onSignInSuccess}
            initialValues={signInModel()}
          />
        </View>
        <RegisterLink containerStyle={Gutters.regularBMargin} />
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { aspectRatio: 4 / 1, height: 50, width: 200 },
  topImage: {
    height: width * 1.19,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -width * 0.718 : -width * 0.65,
    width,
  },
});

export default SignInScreen;
