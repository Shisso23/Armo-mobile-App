/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

import CustomInput from '../../molecules/custom-input';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

type DescriptionInputProps = {
  handleChange: Function;
  handleBlur: Function;
  value: string;
  error: Function;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  handleChange,
  handleBlur,
  value,
  error,
}) => {
  const [textAlignCenter, setTextAlignCenter] = useState(false);
  const [textBold, setTextBold] = useState(false);
  const [textItalics, setTextItalics] = useState(false);
  const { Gutters, Layout, Common } = useTheme();

  const handleUndo = () => {
    setTextAlignCenter(false);
    setTextBold(false);
    setTextItalics(false);
  };

  return (
    <>
      <View>
        <CustomInput
          value={value}
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          label="Description"
          errorMessage={error('description')}
          multiline={true}
          inputStyle={[
            styles.inputStyle,
            {
              fontStyle: textItalics ? 'italic' : 'normal',
              fontWeight: textBold ? 'bold' : 'normal',
              textAlign: textAlignCenter ? 'center' : 'left',
            },
          ]}
          inputContainerStyle={Common.inputContainer}
          leftIcon={undefined}
          inputHeight={180}
        />
        <View
          style={[
            Layout.rowBetween,
            Common.inputWithRoundBorders,
            Layout.alignItemsCenter,
            Gutters.regularHPadding,
            styles.textFormater,
          ]}
        >
          <Icon
            name="bold"
            type="font-awesome"
            size={19}
            color={Colors.white}
            style={{ opacity: textBold ? 1 : 0.6 }}
            onPress={() => setTextBold(!textBold)}
          />
          <Icon
            name="italic"
            type="feather"
            size={19}
            color={Colors.white}
            style={{ opacity: textItalics ? 1 : 0.6 }}
            onPress={() => setTextItalics(!textItalics)}
          />
          <Icon
            name="format-align-center"
            color={Colors.white}
            style={{ opacity: textAlignCenter ? 1 : 0.6 }}
            onPress={() => setTextAlignCenter(!textAlignCenter)}
          />
          <Icon
            name="rotate-left"
            type="font-awesome"
            size={18}
            color={Colors.white}
            style={{ opacity: 0.9 }}
            onPress={handleUndo}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.35 },
  image: { height: 70, width: width * 0.65 },
  inputStyle: { fontSize: 14, height: '100%' },
  textFormater: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    bottom: 23,
    minHeight: 30,
    position: 'absolute',
    width: '100%',
  },
  texts: { fontSize: 15, lineHeight: 22, opacity: 0.86, textAlign: 'center' },
});
export default DescriptionInput;
