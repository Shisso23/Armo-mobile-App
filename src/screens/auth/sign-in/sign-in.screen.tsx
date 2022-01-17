import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Text,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { RegisterLink } from '../../../components';
import { FormScreenContainer } from '../../../components';
import { SignInForm } from '../../../components/forms';
import { isAuthenticatedFlowAction } from '../../../reducers/app-reducer/app.actions';
import { userAuthService } from '../../../services';
import { signInModel, SignInProps } from '../../../models';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { Gutters, Layout, Images, Common } = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const _onSignInSuccess = () => {
    RNBootSplash.show({ fade: true });
    dispatch(isAuthenticatedFlowAction());
    RNBootSplash.hide({ fade: true });
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
          <Image source={Images.logo} style={[styles.image]} />
          <SignInForm
            submitForm={signIn}
            onSuccess={_onSignInSuccess}
            initialValues={signInModel()}
          />
          <Text style={[styles.signUpMessage, Layout.alignSelfCenter, Gutters.regularMargin]}>
            By signing in you agree to our
            <Pressable onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text style={Common.link}>Terms of Service and Privacy policy</Text>
            </Pressable>
          </Text>
        </View>

        <RegisterLink containerStyle={Gutters.regularBMargin} />
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { borderRadius: 15, height: 80, resizeMode: 'contain', width: 350 },
  signUpMessage: { color: Colors.gray, fontSize: 15, lineHeight: 21, textAlign: 'center' },
  topImage: {
    height: width * 1.19,
    position: 'absolute',
    top: Platform.OS === 'ios' ? -width * 0.718 : -width * 0.65,
    width,
  },
});

export default SignInScreen;
