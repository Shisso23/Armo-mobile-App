import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import useTheme from '../../../theme/hooks/useTheme';

import { AuthStackProps } from '../../../navigation/auth/types';

type ForgotPasswordLinkProps = {
  containerStyle: ViewStyle | Array<ViewStyle>;
};

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ containerStyle }) => {
  const navigation = useNavigation<AuthStackProps>();
  const { Layout, Common } = useTheme();

  const _handleForgotPassword = () => navigation.navigate('ForgotPassword');

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={[Layout.center]} delayPressIn={0} onPress={_handleForgotPassword}>
        <Text style={[Common.link]}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordLink;
