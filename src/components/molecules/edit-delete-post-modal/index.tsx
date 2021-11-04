import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Menu } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

type EditDeletePostProps = {
  handleEdit: Function;
  handleDelete: Function;
  post: Object;
};

const EditDeletePost: React.FC<EditDeletePostProps> = ({ handleEdit, handleDelete, post }) => {
  const [postOptionsModalVisible, setPostOptionsModalVisible] = useState(false);
  const { user } = useSelector(userSelector);
  const owner = _.get(post, 'owner', {});
  const isOwner = useMemo(() => user.id === owner.id, [owner.id, user.id]);
  const { Gutters, Layout } = useTheme();

  const hidePostOptionsModal = () => {
    setPostOptionsModalVisible(false);
  };

  return (
    <>
      <Menu
        style={[Layout.alignSelfCenter, styles.menu]}
        visible={postOptionsModalVisible}
        onDismiss={hidePostOptionsModal}
        anchor={
          isOwner && (
            <Icon
              name="dots-vertical"
              type="material-community"
              onPress={() => setPostOptionsModalVisible(true)}
            />
          )
        }
        contentStyle={styles.postMenuContent}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.postMenuTitle}>Post</ListItem.Title>
          </ListItem.Content>
          <Icon name="md-close-circle-outline" type="ionicon" onPress={hidePostOptionsModal} />
        </ListItem>
        <TouchableOpacity
          style={Gutters.regularMargin}
          onPress={() => {
            handleEdit();
            setPostOptionsModalVisible(false);
          }}
        >
          <Text>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Gutters.regularMargin}
          onPress={() => {
            handleDelete();
            setPostOptionsModalVisible(false);
          }}
        >
          <Text>Delete Post</Text>
        </TouchableOpacity>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    ...Platform.select({
      android: { backgroundColor: Colors.transparent },
      ios: {},
    }),
    borderRadius: 15,
    marginBottom: 100,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0.2,
      width: 0.2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    top: '35%',
    width: '80%',
  },
  postMenuContent: { borderRadius: 15, height: '100%', width: '100%' },
  postMenuTitle: { fontWeight: Platform.OS === 'ios' ? '600' : 'bold' },
});
export default EditDeletePost;
