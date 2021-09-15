import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

import { SignUpForm } from '../../../components/forms';
import { signUpFormModel } from '../../../models';
import FormScreenContainer from '../../../components/containers/form-screen-container/form-screen.container';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

const SignUpScreen: React.FC = () => {
  const { Gutters } = useTheme();
  const isFocused = useIsFocused();

  const submitForm = async (values: Object) => {
    console.log('submit', values);
  };

  return (
    <>
      {isFocused && <StatusBar barStyle="default" backgroundColor={Colors.primary} />}
      <FormScreenContainer contentContainerStyle={Gutters.regularPadding}>
        <Text style={[styles.title, Gutters.smallVMargin]}>Sign Up</Text>
        <Text style={[Gutters.smallVMargin, { color: Colors.shadow }]}>
          Add your details to sign up
        </Text>
        <View style={Gutters.largeHMargin}>
          <SignUpForm submitForm={submitForm} initialValues={signUpFormModel()} />
        </View>
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
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
