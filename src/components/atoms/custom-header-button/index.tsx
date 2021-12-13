import React from 'react';
import { Image, Platform } from 'react-native';
import TouchableItem from '@react-navigation/drawer/src/views/TouchableItem';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../theme';
import BackButton from '../back-button';

type CustomHeaderButtonProps = {
  headerLeftAccessibilityLabel?: string;
  tintColor?: string | String;
  image?: Number;
  onPress: () => void;
  backButton?: Boolean;
};

const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = ({
  headerLeftAccessibilityLabel = '',
  tintColor = '',
  image = 0,
  onPress,
  backButton = false,
}) => {
  const { Custom } = useTheme();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return backButton ? (
    <BackButton onBack={goBack} />
  ) : (
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
