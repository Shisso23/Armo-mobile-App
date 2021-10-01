import React from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type FormScreenContainerProps = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle | Array<ViewStyle>;
};

const FormScreenContainer: React.FC<FormScreenContainerProps> = ({
  children,
  contentContainerStyle,
}) => (
  <KeyboardAwareScrollView
    contentContainerStyle={contentContainerStyle}
    keyboardShouldPersistTaps="handled"
  >
    {children}
  </KeyboardAwareScrollView>
);

export default FormScreenContainer;
