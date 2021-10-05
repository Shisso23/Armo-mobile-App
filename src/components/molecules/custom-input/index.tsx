import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps, Icon } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

interface CustomInputProps extends InputProps {
  inputHeight?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  inputHeight = 50,
  inputContainerStyle,
  multiline,
  ...props
}) => {
  const { Layout, Common, Gutters } = useTheme();
  return (
    <Input
      labelStyle={styles.label}
      leftIcon={<Icon name="lock" type="fontiso" size={18} iconStyle={styles.icon} />}
      inputContainerStyle={[
        Common.inputWithRoundBorders,
        Gutters.smallLPadding,
        Layout.alignItemsStart,
        { height: inputHeight },
        styles.inputContainer,
        inputContainerStyle,
      ]}
      inputStyle={[
        styles.inputStyle,
        { height: inputHeight },
        multiline && styles.verticalAlignTextTop,
      ]}
      errorStyle={styles.errorStyle}
      multiline={multiline}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    marginBottom: 15,
    marginTop: -5,
  },
  icon: { color: Colors.shadow, opacity: 0.5 },
  inputContainer: {
    borderBottomWidth: 0,
    elevation: 15,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  inputStyle: { fontSize: 14, height: '100%' },
  label: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.7,
  },
  verticalAlignTextTop: {
    textAlignVertical: 'top',
  },
});

export default CustomInput;
