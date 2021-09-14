import React from 'react';
import { TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements';

import useTheme from '../../theme/hooks/useTheme';
import { Colors } from '../../theme/Variables';

type BackButtonProps = {
  onBack: any;
  color?: any;
};

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { Gutters } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onBack}
      style={Gutters.smallLMargin}
      hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}
    >
      <Icon
        name="arrow-left"
        type="material-community"
        size={25}
        color={props.color || Colors.black}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
