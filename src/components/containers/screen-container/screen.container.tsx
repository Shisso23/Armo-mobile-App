import React from 'react';
import { ScrollView } from 'react-native';

type ScreenContainerProps = {
  children: React.ReactNode;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  return <ScrollView>{children}</ScrollView>;
};

export default ScreenContainer;
