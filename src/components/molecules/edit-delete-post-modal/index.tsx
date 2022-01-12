import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Menu, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import ReportPostModal from '../report-post-modal';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';

type EditDeletePostProps = {
  handleEdit: Function;
  handleDelete: Function;
  handleReport: Function;
  post: Object;
};

const EditDeletePost: React.FC<EditDeletePostProps> = ({
  handleEdit,
  handleDelete,
  handleReport,
  post,
}) => {
  const [postOptionsModalVisible, setPostOptionsModalVisible] = useState(false);
  const { user } = useSelector(userSelector);
  const { isLoadingReportUser, isLoadingDeletePost } = useSelector(postsSelector);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const owner = _.get(post, 'owner', {});
  const isOwner = useMemo(() => user.id === owner.id, [owner.id, user.id]);
  const { Gutters, Layout } = useTheme();

  const hidePostOptionsModal = () => {
    setPostOptionsModalVisible(false);
  };

  const showPostOptionsModal = () => {
    setPostOptionsModalVisible(true);
  };

  const hideReportModal = () => {
    setReportModalVisible(false);
  };

  return (
    <>
      <Menu
        style={[Layout.alignSelfCenter, styles.menu]}
        visible={postOptionsModalVisible}
        onDismiss={hidePostOptionsModal}
        anchor={
          <Pressable
            onPress={showPostOptionsModal}
            hitSlop={{ top: 30, bottom: 30, left: 70, right: 50 }}
          >
            {({ pressed }) => {
              return (
                <Icon
                  name="dots-vertical"
                  type="material-community"
                  size={28}
                  containerStyle={{
                    backgroundColor: pressed ? Colors.semiTransparent : Colors.transparent,
                  }}
                />
              );
            }}
          </Pressable>
        }
        contentStyle={styles.postMenuContent}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.postMenuTitle}>Post</ListItem.Title>
          </ListItem.Content>
          <Icon name="md-close-circle-outline" type="ionicon" onPress={hidePostOptionsModal} />
        </ListItem>
        {(isOwner && (
          <>
            <TouchableOpacity
              style={Gutters.regularMargin}
              onPress={() => {
                handleEdit();
                hidePostOptionsModal();
              }}
            >
              <Text>Edit Post</Text>
            </TouchableOpacity>
            <ActivityIndicator
              animating={isLoadingDeletePost}
              color={Colors.lightGray}
              style={styles.loadingIndicator}
              size={25}
            />
            <TouchableOpacity
              style={Gutters.regularMargin}
              onPress={async () => {
                await handleDelete();
                hidePostOptionsModal();
              }}
            >
              <Text>Delete Post</Text>
            </TouchableOpacity>
          </>
        )) || (
          <TouchableOpacity
            style={Gutters.regularMargin}
            onPress={async () => {
              setReportModalVisible(true);
            }}
          >
            <Text>Report Post</Text>
          </TouchableOpacity>
        )}
        <ReportPostModal
          style={Gutters.regularLMargin}
          handleReport={async (reason: string) =>
            handleReport({ postId: _.get(post, 'id', ''), reason, commentId: null }).finally(() => {
              hidePostOptionsModal();
              setReportModalVisible(false);
            })
          }
          visible={reportModalVisible}
          onDismiss={hideReportModal}
          loading={isLoadingReportUser}
        />
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    alignSelf: 'center',
    position: 'absolute',
    top: '30%',
  },
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
