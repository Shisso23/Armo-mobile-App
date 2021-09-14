import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';

type TermsAndConditionsProps = {
  checked: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ checked, onPress }) => {
  const { Common, Colors, Layout } = useTheme();

  return (
    <View style={[Layout.row, Layout.alignItemsCenter]}>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
        checkedColor={Colors.primary}
      />
      <Text>I agree to the</Text>
      <TouchableOpacity delayPressIn={0} onPress={() => null}>
        <Text style={[Common.link]}> Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TermsAndConditions;
