import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import { Avatar, List } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';

import {
  getNotificationsAction,
  markAsReadAction,
} from '../../../reducers/notifications-reducer/notifications.actions';
import useTheme from '../../../theme/hooks/useTheme';

const Notification = ({ notification }: { notification: Object }) => {
  const dispatch = useDispatch();

  const notificationId = _.get(notification, 'id');
  const datePublished = _.get(notification, 'datePublished', new Date());
  const title = _.get(notification, 'title', '');
  const message = _.get(notification, 'message', '');
  const seen = _.get(notification, 'seen', false) === 'Yes';

  const { Layout, Images, Colors, Gutters } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSeen, setIsSeen] = useState(seen);

  const _handleCollapse = () => {
    if (!isSeen) {
      dispatch(markAsReadAction(notificationId));
      dispatch(getNotificationsAction());
      setIsSeen(true);
    }
    setIsCollapsed(!isCollapsed);
  };
  const formatDate = (date: string) => {
    return Moment(date).add({ hours: 2 }).fromNow();
  };

  const _setImageUrl = (image: AvatarImageSource) => {
    return !image ? null : image;
  };

  const renderNotification = () => {
    const accordionStyle = {
      borderBottomColor: Colors.darkGray,
      borderBottomWidth: !isCollapsed ? 0 : 0.4,
    };
    return (
      <List.Accordion
        title={`${title}`}
        description={`${formatDate(datePublished)}`}
        left={() => (
          <View style={[Layout.justifyContentCenter]}>
            <Avatar.Image
              rounded
              size={35}
              style={{ backgroundColor: Colors.semiTransparent }}
              source={_setImageUrl(Images.logo)}
            />
          </View>
        )}
        right={() =>
          !isSeen && (
            <Badge
              status="error"
              badgeStyle={[{ backgroundColor: Colors.tertiary }, styles.badge]}
            />
          )
        }
        onPress={_handleCollapse}
        style={[Gutters.smallBMargin, accordionStyle]}
      >
        <Text style={[Gutters.largeRPadding, styles.notificationMessage]}>{message}</Text>
      </List.Accordion>
    );
  };

  return renderNotification();
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 50,
    height: 14,
    width: 14,
  },
  notificationMessage: { lineHeight: 23, textAlign: 'left' },
});

export default Notification;
