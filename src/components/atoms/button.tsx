import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/Variables';

type ButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: any;
  onPress: (event: GestureResponderEvent) => void;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, loading, containerStyle, disabled }) => {
  const { Common } = useTheme();

  return (
    <View style={containerStyle}>
      <Pressable onPress={onPress} disabled={disabled || loading}>
        {({ pressed }) => (
          <View style={[pressed && Common.pressed, Common.viewWithShadow, styles.buttonWrapper]}>
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.buttonText}>{title}</Text>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontFamily: 'Montserrat-SemiBold',
    textTransform: 'uppercase',
  },
  buttonWrapper: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: 'center',
  },
});
