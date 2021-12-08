import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { SignUpForm } from '../../../components/forms';
import { signUpFormModel, SignUpProps } from '../../../models';
import FormScreenContainer from '../../../components/containers/form-screen-container/form-screen.container';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import BackButton from '../../../components/atoms/back-button';
import { flashService, userAuthService } from '../../../services';

const SignUpScreen: React.FC = () => {
  const { Gutters, Layout } = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const submitForm = async (values: SignUpProps) => {
    return userAuthService.register(values).then((response) => {
      const status = _.get(response, 'status', null);
      if (status === 200 || status === 204) {
        flashService.success('Successfully Signed Up ');
        return navigation.navigate('SignIn');
      }
      return response;
    });
  };

  return (
    <>
      {isFocused && <StatusBar barStyle="default" backgroundColor={Colors.primary} />}
      <BackButton onBack={navigation.goBack} style={[styles.backButton, Layout.alignSelfStart]} />
      <FormScreenContainer contentContainerStyle={Gutters.regularPadding}>
        <Text style={[styles.title, Gutters.smallVMargin]}>Sign Up</Text>
        <Text style={[Gutters.smallVMargin, { color: Colors.shadow }]}>
          Add your details to sign up
        </Text>
        <View style={Gutters.regularHMargin}>
          <SignUpForm submitForm={submitForm} initialValues={signUpFormModel()} />
        </View>
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: { marginTop: 60, paddingBottom: 10 },
  bulletItem: {
    flexDirection: 'row',
  },
  linkText: {
    color: Colors.linkText,
    textDecorationLine: 'underline',
  },
  title: { color: Colors.text, fontSize: 27, fontWeight: '400' },
});

export default SignUpScreen;
