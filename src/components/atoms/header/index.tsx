import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Icon, Badge } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import CustomHeaderButton from '../custom-header-button';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { notificationsSelector } from '../../../reducers/notifications-reducer/notifications.reducer';

type BackButtonProps = {
  onBack: any;
  color?: any;
  style?: any;
  backButton?: Boolean;
  engagementScoreVisible?: Boolean;
  notificationBellVisible?: Boolean;
};

const Header: React.FC<BackButtonProps> = (props) => {
  const { Gutters, Common, Layout } = useTheme();
  const { user } = useSelector(userSelector);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { unOpenedNotifications } = useSelector(notificationsSelector);
  const handleOnPress = () => {
    return navigation.toggleDrawer();
  };

  const goToNotifications = () => navigation.navigate('Notifications');

  return (
    <View style={[Layout.rowBetween, Layout.alignItemsEnd, styles.header]}>
      <CustomHeaderButton
        {...props}
        onPress={handleOnPress}
        image={require('../../../assets/icons/menu/menu.png')}
        backButton={props.backButton}
      />

      <View style={[Layout.rowBetween, Gutters.tinyVPadding, Gutters.regularRMargin]}>
        {props.notificationBellVisible !== false && (
          <TouchableOpacity onPress={goToNotifications}>
            <Icon
              type="font-awesome-5"
              name="bell"
              size={23}
              containerStyle={[Gutters.smallRMargin, Gutters.tinyTMargin, styles.iconsOpacity]}
            />
            {unOpenedNotifications > 0 && (
              <Badge
                containerStyle={styles.badgeContainerStyle}
                value={`${unOpenedNotifications}`}
              />
            )}
          </TouchableOpacity>
        )}

        {props.engagementScoreVisible !== false && (
          <View style={[Layout.rowBetween, styles.engagementScore, Gutters.tinyPadding]}>
            <Icon
              name="user"
              type="feather"
              size={16}
              containerStyle={[
                styles.iconsOpacity,
                Common.android60PercentWhite,
                Gutters.tinyRMargin,
              ]}
            />
            <Text>{user.engagementScore}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  badgeContainerStyle: {
    position: 'absolute',
    right: 2,
    top: 0,
  },
  engagementScore: { borderColor: Colors.secondary, borderRadius: 10, borderWidth: 1 },
  header: { backgroundColor: Colors.transparent, height: 80, overflow: 'visible' },
  iconsOpacity: { opacity: 0.72 },
});
