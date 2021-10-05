import TouchableItem from '@react-navigation/drawer/src/views/TouchableItem';
import { Image, Platform } from 'react-native';
import React from 'react';

import { useTheme } from '../../../theme';

type CustomHeaderButtonProps = {
  headerLeftAccessibilityLabel?: string;
  tintColor?: string | String;
  image?: Number;
  onPress: () => void;
};

const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = ({
  headerLeftAccessibilityLabel = '',
  tintColor = '',
  image = 0,
  onPress,
}) => {
  const { Custom } = useTheme();

  return (
    <TouchableItem
      accessible
      accessibilityRole="button"
      accessibilityLabel={headerLeftAccessibilityLabel}
      delayPressIn={0}
      onPress={onPress}
      style={Custom.headerButton}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
      borderless
    >
      <Image
        style={[Custom.headerButtonIcon, tintColor ? { tintColor } : null]}
        source={image}
        fadeDuration={0}
      />
    </TouchableItem>
  );
};

export default CustomHeaderButton;
