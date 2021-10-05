import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';

import useTheme from '../../theme/hooks/useTheme';
import { Colors } from '../../theme/Variables';

type BackButtonProps = {
  onBack: any;
  color?: any;
  style?: any;
};

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { Gutters } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onBack}
      style={[Gutters.smallLMargin, _.get(props, 'style', {})]}
      hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}
    >
      <Icon
        name="arrow-left"
        type="material-community"
        size={28}
        color={props.color || Colors.black}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
