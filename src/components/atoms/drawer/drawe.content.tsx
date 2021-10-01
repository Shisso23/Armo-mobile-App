import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Drawer, Divider } from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import { Avatar, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import { signOutAction } from '../../../reducers/user-auth-reducer/user-auth.actions';

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { Fonts, Gutters, Layout, Common, Images } = useTheme();

  return (
    <View style={[Layout.fill]}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={{ backgroundColor: Colors.darkBrown }}>
          <View style={[Gutters.largeTPadding, Gutters.regularLPadding]}>
            <Avatar containerStyle={styles.userAvatar} source={Images.signInTop} size={65} />
            <Text
              style={[
                Fonts.textLarge,
                styles.userFullName,
                Gutters.regularVMargin,
                Common.drawerUserText,
              ]}
            >
              Hyacinthe Shisso
            </Text>
          </View>
          <Divider style={[Common.backgroundWhite, styles.divider]} />
          <DrawerItem
            icon={() => (
              <Icon
                color={Colors.secondary}
                size={22}
                name="home-outline"
                type="material-community"
              />
            )}
            label="Home"
            onPress={() => navigation.navigate('Home')}
            labelStyle={styles.labelWhite}
          />
          <DrawerItem
            icon={() => (
              <Icon
                color={Colors.secondary}
                size={22}
                name="account-outline"
                type="material-community"
              />
            )}
            label="Profile"
            labelStyle={styles.labelWhite}
            onPress={() => navigation.navigate('Profile')}
          />
        </Drawer.Section>

        <View style={{ backgroundColor: Colors.white }}>
          <Drawer.Section>
            <DrawerItem
              icon={() => (
                <Icon color={Colors.secondary} size={22} name="account" type="material-community" />
              )}
              label="My Posts"
              labelStyle={styles.labelBlack}
              onPress={() => navigation.navigate('Forums')}
            />

            <DrawerItem
              icon={() => (
                <Icon
                  color={Colors.secondary}
                  size={22}
                  name="account-group"
                  type="material-community"
                />
              )}
              label="Sponsors and Supporters"
              labelStyle={styles.labelBlack}
              onPress={() => navigation.navigate('Sponsors')}
            />
            <DrawerItem
              icon={() => (
                <Icon color={Colors.secondary} size={22} name="history" type="material-community" />
              )}
              label="Subscriptions"
              labelStyle={styles.labelBlack}
              onPress={() => navigation.navigate('History')}
            />
          </Drawer.Section>
        </View>
        <DrawerItem
          icon={() => (
            <Icon color={Colors.secondary} size={22} name="exit-outline" type="ionicon" />
          )}
          label="Sign Out"
          labelStyle={styles.labelBlack}
          onPress={() => dispatch(signOutAction())}
        />
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  divider: { backgroundColor: Colors.secondary, height: 2.5 },
  labelBlack: { color: Colors.black, opacity: 0.82 },
  labelWhite: { color: Colors.white },
  userAvatar: { backgroundColor: Colors.white, borderRadius: 15 },
  userFullName: { color: Colors.white, fontSize: 24, fontWeight: '800' },
});
export default DrawerContent;
