import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '../../../theme';

type ScreenContainerProps = {
  children: React.ReactNode;
};

const ScreenContainer: React.FC<ScreenContainerProps> = (props) => {
  const { Gutters } = useTheme();
  return (
    <ScrollView contentContainerStyle={[Gutters.largeHPadding, Gutters.largeTPadding]} {...props}>
      {props.children}
    </ScrollView>
  );
};

export default ScreenContainer;
