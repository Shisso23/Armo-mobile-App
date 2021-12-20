import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import moment from 'moment';
import _ from 'lodash';
import { Colors } from '../../../theme/Variables';
import { StyleSheet } from 'react-native';
import EditDeletePost from '../edit-delete-post-modal';

type UserInfoBoxProps = {
  user: Object;
  post?: Object;
  handlePostDelete: Function;
  handlePostEdit: Function;
  handlePostReport: Function;
};

const UserInfoBox: React.FC<UserInfoBoxProps> = ({
  user,
  post,
  handlePostEdit,
  handlePostDelete,
  handlePostReport,
}) => {
  const formatDate = (date: any) => {
    return moment(date).add({ hours: 2 }).fromNow();
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
        <ListItem.Title>{`${_.get(user, 'firstName', '')} ${_.get(
          user,
          'lastName',
          '',
        )}`}</ListItem.Title>
        <ListItem.Subtitle>{formatDate(_.get(post, 'createDate', new Date()))}</ListItem.Subtitle>
      </ListItem.Content>
      <EditDeletePost
        handleDelete={handlePostDelete}
        handleEdit={handlePostEdit}
        post={post}
        handleReport={handlePostReport}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  avatar: { borderColor: Colors.darkBrown, borderWidth: 1 },
  container: { backgroundColor: Colors.transparent, paddingLeft: 0 },
});

export default UserInfoBox;
