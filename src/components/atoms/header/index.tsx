import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import CustomHeaderButton from '../custom-header-button';

type BackButtonProps = {
  onBack: any;
  color?: any;
  style?: any;
};

const Header: React.FC<BackButtonProps> = (props) => {
  const { Gutters, Layout } = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleOnPress = () => {
    return navigation.toggleDrawer();
  };

  return (
    <View style={[Layout.rowBetween, Layout.alignItemsEnd, styles.header]}>
      <CustomHeaderButton
        {...props}
        onPress={handleOnPress}
        image={require('../../../assets/icons/menu/menu.png')}
      />

      <View style={[Layout.rowBetween, Gutters.tinyVPadding, Gutters.regularRMargin]}>
        <Icon
          type="font-awesome-5"
          name="bell"
          size={20}
          containerStyle={[Gutters.smallRMargin, Gutters.tinyTMargin, styles.iconsOpacity]}
        />

        <View style={[Layout.rowBetween, styles.userView, Gutters.tinyPadding]}>
          <Icon
            name="user"
            type="feather"
            size={15}
            containerStyle={[styles.iconsOpacity, Gutters.tinyRMargin]}
          />
          <Text>username</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: { height: 90 },
  iconsOpacity: { opacity: 0.72 },
  userView: { borderColor: Colors.secondary, borderRadius: 10, borderWidth: 1 },
});
