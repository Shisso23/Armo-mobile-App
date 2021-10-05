import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { ForgotPasswordForm } from '../../../components/forms';
import { userAuthService } from '../../../services';
import { forgotPasswordModel, ForgotPasswordProps } from '../../../models';
import { useTheme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC = () => {
  const { Gutters, Layout, Images } = useTheme();
  const navigation = useNavigation();
  const _handleCancel = () => {
    navigation.navigate('SignIn');
  };

  const submitForm = async (values: ForgotPasswordProps) => {
    await userAuthService.forgotPassword(values).then(() => {
      navigation.navigate('SignIn');
    });
  };
  return (
    <FormScreenContainer
      contentContainerStyle={[
        Gutters.regularPadding,
        Layout.alignItemsCenter,
        Layout.fill,
        Gutters.largeHPadding,
        styles.container,
      ]}
    >
      <Image source={Images.logo3} style={[styles.image, Gutters.largeBMargin]} />
      <Text style={[styles.texts, Gutters.largeVMargin]}>
        Enter the email address you used when you signed up and we&apos;ll send you instructions to
        reset your password
      </Text>
      <ForgotPasswordForm
        submitForm={submitForm}
        initialValues={forgotPasswordModel()}
        _handleCancel={_handleCancel}
      />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
  texts: { fontSize: 15, lineHeight: 22, opacity: 0.86, textAlign: 'center' },
});
export default ForgotPasswordScreen;
