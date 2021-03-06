import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { FormScreenContainer } from '../../../components';
import { ResetPasswordForm } from '../../../components/forms';
import { resetPasswordModel, ResetPasswordProps } from '../../../models';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

const ResetPasswordScreen: React.FC = () => {
  const { Gutters, Layout, Images } = useTheme();
  const onSubmit = async (formData: ResetPasswordProps) => {
    console.log(formData); //TODO reset password
    return null;
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
      <Image source={Images.logo} style={[styles.image, Gutters.largeBMargin]} />
      <ResetPasswordForm submitForm={onSubmit} initialValues={resetPasswordModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
});
export default ResetPasswordScreen;
