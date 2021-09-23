import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import { Colors } from '../../../theme/Variables';
import { StyleSheet } from 'react-native';

type UserInfoBoxProps = {
  user: Object;
  post?: Object;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ user, post }) => {
  const formatDate = (date: any) => {
    return moment(date).fromNow();
  };
  return (
    <ListItem containerStyle={styles.container}>
      <Avatar
        rounded
        source={0}
        icon={{ name: 'user', type: 'font-awesome-5', color: Colors.gray }}
        size={35}
        containerStyle={styles.avatar}
      />
      <ListItem.Content>
        <ListItem.Title>{_.get(user, 'name', '')}</ListItem.Title>
        <ListItem.Subtitle>{formatDate(_.get(post, 'date', new Date()))}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Title>#{_.get(post, 'id', '#')}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  avatar: { borderColor: Colors.darkBrown, borderWidth: 1 },
  container: { backgroundColor: Colors.transparent, paddingLeft: 0 },
});

export default UserInfoBox;
