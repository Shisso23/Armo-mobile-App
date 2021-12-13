import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon, ListItem, Divider } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { postCommentsSelector } from '../../../reducers/post-comments-reducer/post-comments.reducer';
import PostReply from '../../../components/molecules/post-reply';
import { getPostCommentsAction } from '../../../reducers/post-comments-reducer/post-comments.actions';
import { getUsersAction } from '../../../reducers/user-reducer/user.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const { width } = Dimensions.get('window');

type PostRepliesProps = {
  post: Object;
};

const PostReplies: React.FC<PostRepliesProps> = ({ post }) => {
  const { Gutters } = useTheme();
  const dispatch = useDispatch();
  const { isLoadingGetPostComments, postComments } = useSelector(postCommentsSelector);
  const { users } = useSelector(userSelector);
  const [repliesExpanded, setRepliesExpanded] = useState(false);

  useEffect(() => {
    if (repliesExpanded) {
      dispatch(getPostCommentsAction(_.get(post, 'id', '')));
    }
  }, [repliesExpanded]);

  useFocusEffect(
    useCallback(() => {
      if (repliesExpanded) {
        dispatch(getPostCommentsAction(_.get(post, 'id', '')));
      }
      dispatch(getUsersAction());
    }, [repliesExpanded]),
  );

  const onVote = () => {
    dispatch(getPostCommentsAction(_.get(post, 'id', '')));
  };

  const renderPostReplies = ({ item, index }: { item: Object; index: number }) => {
    return (
      <>
        <PostReply reply={item} users={users} post={post} onVote={onVote} />
        {index < postComments.length - 1 && <Divider style={styles.postDivider} />}
      </>
    );
  };

  const toggleExpandReplies = () => {
    setRepliesExpanded(!repliesExpanded);
  };

  return (
    <View>
      <ListItem.Accordion
        noIcon
        underlayColor={Colors.transparent}
        content={
          <>
            <Text style={[styles.repliesText, Gutters.smallRMargin]}>Replies</Text>
            <ListItem.Content>
              <Icon
                name={repliesExpanded ? 'caret-down' : 'caret-right'}
                type="fontisto"
                size={13}
              />
            </ListItem.Content>
          </>
        }
        containerStyle={{ backgroundColor: Colors.transparent }}
        isExpanded={repliesExpanded}
        onPress={toggleExpandReplies}
      >
        <View style={Gutters.tinyHPadding}>
          <Divider style={styles.fullDivider} />
          <Text style={[Gutters.smallMargin, styles.warning]}>
            Remember to keep comments respectful and to follow our Community Guidelines
          </Text>
          <Divider style={styles.fullDivider} />
          <FlatList data={postComments} renderItem={renderPostReplies} />
        </View>
      </ListItem.Accordion>
      <ActivityIndicator
        size={35}
        style={Gutters.smallTMargin}
        animating={isLoadingGetPostComments}
        color={Colors.lightGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullDivider: { height: 1, left: -15, width: width * 1.5 },
  postDivider: { height: 1.8 },
  repliesText: { fontSize: 16 },
  warning: { color: Colors.darkGray, fontSize: 13 },
});
export default PostReplies;
