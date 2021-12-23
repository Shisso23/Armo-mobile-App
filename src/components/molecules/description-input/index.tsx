/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import CustomInput from '../../molecules/custom-input';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

type DescriptionInputProps = {
  handleChange: Function;
  handleBlur: Function;
  error: Function;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({ handleChange, handleBlur, error }) => {
  const { Common } = useTheme();

  return (
    <>
      <View>
        <CustomInput
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          label="Description"
          errorMessage={error('description')}
          multiline={true}
          inputStyle={[styles.inputStyle, { height: 180, textAlignVertical: 'top' }]}
          containerStyle={{ elevation: 0 }}
          inputContainerStyle={Common.inputContainer}
          leftIcon={undefined}
          inputHeight={180}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
  inputStyle: { borderBottomLeftRadius: 0, fontSize: 14, height: '100%' },
  textFormater: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    bottom: 20,
    minHeight: 30,
    position: 'absolute',
    width: '100%',
  },
  texts: { fontSize: 15, lineHeight: 22, opacity: 0.86, textAlign: 'center' },
});
export default DescriptionInput;
