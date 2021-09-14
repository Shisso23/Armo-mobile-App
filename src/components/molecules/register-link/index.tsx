import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import useTheme from '../../../theme/hooks/useTheme';

import { AuthStackProps } from '../../../navigation/auth/types';

type RegisterLinkProps = {
  containerStyle: ViewStyle | Array<ViewStyle>;
};

const RegisterLink: React.FC<RegisterLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();
  const { Layout, Common } = useTheme();

  const _handleRegister = () => navigation.navigate('Register');

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={[Layout.center]} delayPressIn={0} onPress={_handleRegister}>
        <Text style={[Common.link]}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterLink;
