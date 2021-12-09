import React, { useEffect } from 'react';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

import useTheme from '../../../theme/hooks/useTheme';
import { getNotificationsAction } from '../../../reducers/notifications-reducer/notifications.actions';
import { notificationsSelector } from '../../../reducers/notifications-reducer/notifications.reducer';
import Notification from '../../../components/molecules/notification';

const { width } = Dimensions.get('window');
const NotificationsScreen = () => {
  const { notifications, isLoadingNotifications } = useSelector(notificationsSelector);
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getNotifications = () => {
    dispatch(getNotificationsAction());
  };

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, []);

  const goBack = () => navigation.goBack();

  const renderNotification = ({ item }: { item: Object }) => <Notification notification={item} />;

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <View style={[Layout.row, Gutters.largeBMargin]}>
        <Icon name="arrow-left" type="material-community" size={25} onPress={goBack} />
        <Text style={[styles.title, Gutters.smallLMargin]}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        refreshing={isLoadingNotifications}
        onRefresh={getNotifications}
        ListEmptyComponent={
          <Text style={[Layout.alignSelfCenter]}>There are no notifications here!</Text>
        }
      />
    </View>
  );
};

NotificationsScreen.propTypes = {};

NotificationsScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  title: { fontSize: 20, fontWeight: '500' },
});

export default NotificationsScreen;
