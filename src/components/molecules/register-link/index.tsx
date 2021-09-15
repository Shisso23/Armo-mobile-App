import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import useTheme from '../../../theme/hooks/useTheme';

import { AuthStackProps } from '../../../navigation/auth/types';
import { Colors } from '../../../theme/Variables';

type RegisterLinkProps = {
  containerStyle: ViewStyle | Array<ViewStyle>;
};

const RegisterLink: React.FC<RegisterLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();
  const { Layout, Common, Gutters } = useTheme();

  const _handleRegister = () => navigation.navigate('SignUp');

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={[Layout.rowCenter]} delayPressIn={0} onPress={_handleRegister}>
        <Text style={styles.signUpMessage}>Don&apos;t have an account?</Text>
        <Text style={[Common.link, Gutters.tinyLMargin]}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpMessage: { color: Colors.black, fontSize: 15, opacity: 0.7 },
});

export default RegisterLink;
