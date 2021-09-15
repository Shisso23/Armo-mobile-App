import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import { FormScreenContainer } from '../../../components';
import { ResetPasswordForm } from '../../../components/forms';
import { resetPasswordModel } from '../../../models';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

const ResetPasswordScreen: React.FC = () => {
  const { Gutters, Layout, Images } = useTheme();
  const onSubmit = () => {};
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
      <ResetPasswordForm submitForm={onSubmit} initialValues={resetPasswordModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
});
export default ResetPasswordScreen;
