import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import useTheme from '../../../theme/hooks/useTheme';

import { AuthStackProps } from '../../../navigation/auth/types';
import { Colors } from '../../../theme/Variables';

type ForgotPasswordLinkProps = {
  containerStyle: ViewStyle | Array<ViewStyle>;
};

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();
  const { Layout } = useTheme();

  const _handleForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={[Layout.center]} delayPressIn={0} onPress={_handleForgotPassword}>
        <Text style={[styles.forgotPassword]}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: { color: Colors.black, fontSize: 15, opacity: 0.6 },
});

export default ForgotPasswordLink;
