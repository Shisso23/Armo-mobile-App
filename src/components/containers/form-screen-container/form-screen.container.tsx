import React from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type FormScreenContainerProps = {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle | Array<ViewStyle>;
};

const FormScreenContainer: React.FC<FormScreenContainerProps> = (props) => (
  <KeyboardAwareScrollView
    contentContainerStyle={props.contentContainerStyle}
    keyboardShouldPersistTaps="handled"
    {...props}
  >
    {props.children}
  </KeyboardAwareScrollView>
);

export default FormScreenContainer;
