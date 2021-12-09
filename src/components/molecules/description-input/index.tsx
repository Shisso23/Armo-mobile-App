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
  error: Function;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({ handleChange, handleBlur, error }) => {
  const [textAlignCenter, setTextAlignCenter] = useState(false);
  const [textBold, setTextBold] = useState(false);
  const [textItalics, setTextItalics] = useState(false);
  const { Gutters, Layout, Common } = useTheme();

  const handleUndo = () => {
    setTextAlignCenter(false);
    setTextBold(false);
    setTextItalics(false);
  };

  const toggleTextBold = () => setTextBold(!textBold);
  const toggleTextItalics = () => setTextItalics(!textItalics);
  const toggleTextCenter = () => setTextAlignCenter(!textAlignCenter);

  return (
    <>
      <View>
        <CustomInput
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
            { height: 180, textAlignVertical: 'top' },
          ]}
          containerStyle={{ elevation: 0 }}
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
            color={textBold ? Colors.white : Colors.semiTransparent}
            onPress={toggleTextBold}
          />
          <Icon
            name="italic"
            type="feather"
            size={19}
            color={textItalics ? Colors.white : Colors.semiTransparent}
            onPress={toggleTextItalics}
          />
          <Icon
            name="format-align-center"
            color={textAlignCenter ? Colors.white : Colors.semiTransparent}
            onPress={toggleTextCenter}
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
