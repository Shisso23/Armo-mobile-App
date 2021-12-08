import React, { useEffect } from 'react';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';
import { Text, ListItem, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import { getNotificationsAction } from '../../../reducers/notifications-reducer/notifications.actions';
import { notificationsSelector } from '../../../reducers/notifications-reducer/notifications.reducer';

const { width } = Dimensions.get('window');
const NotificationsScreen = () => {
  const { notifications, isLoadingNotifications } = useSelector(notificationsSelector);
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, [dispatch]);

  const renderNotification = ({ item }: { item: Object }) => (
    <>
      <ListItem onPress={() => {}}>
        <ListItem.Content>
          <Text style={styles.message}>{_.get(item, 'message', '')}</Text>
        </ListItem.Content>
        <Text>{moment(_.get(item, 'seenAt', new Date())).add({ hours: 2 }).fromNow()}</Text>
      </ListItem>
      <Divider style={[Gutters.smallHMargin, styles.divider]} />
    </>
  );

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <View style={[Layout.row, Gutters.largeBMargin]}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, Gutters.smallLMargin]}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        refreshing={isLoadingNotifications}
        onRefresh={getNotificationsAction}
      />
    </View>
  );
};

NotificationsScreen.propTypes = {};

NotificationsScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  divider: {
    height: 1.07,
  },
  message: { fontSize: 16, lineHeight: 23 },
  title: { fontSize: 20, fontWeight: '500' },
});

export default NotificationsScreen;
