import React, { useState, createRef } from 'react';
import { View, StyleSheet, Text, Alert, Platform } from 'react-native';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import moment from 'moment';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../..';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShareActionContent from '../share-action-content';
import ReportPostModal from '../report-post-modal';
import { commentsService } from '../../../services';
import { deleteCommentAction } from '../../../reducers/comment-replies-reducer/comment-replies.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { reportUserTypes } from '../../../services/sub-services/report-user-service/report-user.service';
import { reportUserAction } from '../../../reducers/posts-reducer/posts.actions';

type PostReplyProps = {
  reply: Object;
  key?: any;
  post: Object;
  onVote: Function;
};

const PostReply: React.FC<PostReplyProps> = ({ reply, post, onVote }) => {
  const { Gutters, Fonts, Layout } = useTheme();
  const dispatch = useDispatch();
  const { isLoadingReportUser } = useSelector(postsSelector);
  const hasVoted = _.get(reply, 'hasVoted', null);
  const [upVotes, setUpVotes] = useState(_.get(reply, 'upVotes', 0));
  const [downVotes, setDownVotes] = useState(_.get(reply, 'downVotes', 0));
  const [downVoted, setdownVoted] = useState(`${hasVoted}`.toLowerCase() === 'down');
  const [upVoted, setUpVoted] = useState(`${hasVoted}`.toLowerCase() === 'up');

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const actionSheetRef = createRef<any>();
  const navigation = useNavigation();

  const nestedComments = _.get(reply, 'replies', []).map((chilComment: any, index: Number) => {
    return (
      <PostReply
        key={_.get(chilComment, 'id', index)}
        post={post}
        reply={chilComment}
        onVote={onVote}
      />
    );
  });
  const formatDate = (date: any) => {
    return moment(date).add({ hours: 2 }).fromNow();
  };

  const handleClipBoardCopy = () => {
    Clipboard.setString(_.get(reply, 'content', ''));
    actionSheetRef.current.setModalVisible(false);
    Alert.alert('Copied');
  };
  const handleUpVote = async () => {
    commentsService.upVoteComment(_.get(reply, 'id', '')).then(() => {
      if (downVoted) {
        setDownVotes(Math.max(0, downVotes - 1));
      }
      setUpVoted(true);
      setdownVoted(false);
      setUpVotes(upVotes + 1);
      onVote();
    });
  };

  const handleDownVote = async () => {
    commentsService.downVoteComment(_.get(reply, 'id', '')).then(() => {
      if (upVoted) {
        setUpVotes(Math.max(0, upVotes - 1));
      }
      setdownVoted(true);
      setUpVoted(false);
      setDownVotes(downVotes + 1);

      onVote();
    });
  };

  const editComment = () => {
    actionSheetRef.current.setModalVisible(false);
    navigation.navigate('EditComment', { comment: reply });
  };

  const deleteComment = () => {
    dispatch(deleteCommentAction(_.get(reply, 'id', '')));
  };

  const debounceDownVote = _.debounce(handleDownVote, 800, {
    leading: false,
    trailing: true,
  });

  const debounceUpVote = _.debounce(() => handleUpVote(), 800, {
    leading: false,
    trailing: true,
  });

  const handleReportPress = () => {
    actionSheetRef.current.setModalVisible(false);
    setReportModalVisible(true);
  };

  const hideReportModal = () => {
    setReportModalVisible(false);
  };

  const openActionSheet = () => {
    actionSheetRef.current.setModalVisible(true);
  };

  const reportUserPost = async (formData: reportUserTypes) => {
    await dispatch(reportUserAction(formData));
  };

  const handleShare = () => {
    Share.open({
      title: `Post comment`,
      message: _.get(reply, 'content', ''),
      subject: `Post comment`,
      failOnCancel: false,
    })
      .then(() => {
        hideReportModal();
      })
      .catch((error) => {
        Alert.alert('Oh No!', error.message);
      });
  };

  const goToReplyToPost = () => {
    navigation.navigate('ReplyToPost', { post: reply, isPostReply: false });
  };

  return (
    <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
      <ListItem containerStyle={styles.user}>
        <Avatar
          rounded
          source={0}
          icon={{ name: 'user', type: 'font-awesome-5', color: Colors.gray }}
          size={35}
          containerStyle={styles.avatar}
        />
        <ListItem.Content>
          <ListItem.Title>{`${_.get(reply, 'owner.fullName', '')} ${formatDate(
            _.get(reply, 'createDate', new Date()),
          )}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem.Subtitle style={[Fonts.textLeft, styles.comment]}>
        {_.get(reply, 'content', '')}
      </ListItem.Subtitle>

      <ListItem containerStyle={[styles.user, Gutters.regularTMargin, styles.replyText]}>
        <TouchableOpacity
          onPress={goToReplyToPost}
          style={[Fonts.textLeft, styles.comment, Gutters.regularTPadding]}
        >
          <Text>Reply</Text>
        </TouchableOpacity>
        <View style={Layout.row}>
          <Icon
            onPress={upVoted ? () => {} : debounceUpVote}
            color={upVoted ? Colors.secondary : Colors.black}
            name={'chevron-up-circle-outline'}
            type="material-community"
          />
          <Text style={[Gutters.smallLMargin, Gutters.tinyTMargin]}>{upVotes}</Text>
        </View>

        <View style={Layout.row}>
          <Icon
            onPress={downVoted ? () => {} : debounceDownVote}
            color={downVoted ? Colors.secondary : Colors.black}
            name={'chevron-down-circle-outline'}
            type="material-community"
          />
          <Text style={[Gutters.smallLMargin, Gutters.tinyTMargin]}>{downVotes}</Text>
        </View>

        <Icon
          name="dots-horizontal"
          type="material-community"
          style={Gutters.largeLMargin}
          onPress={openActionSheet}
        />
      </ListItem>
      {nestedComments}

      <ActionSheet
        overlayColor={Colors.transparent}
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheet}
      >
        <ShareActionContent
          onSharePress={handleShare}
          onCopyPress={handleClipBoardCopy}
          onReportPress={handleReportPress}
          onEditPress={editComment}
          onDeletePress={deleteComment}
          ownerId={_.get(reply, 'owner.id', '')}
        />
      </ActionSheet>
      <ReportPostModal
        style={Gutters.regularLMargin}
        handleReport={async (reason: string) => {
          await reportUserPost({ postId: null, reason, commentId: _.get(reply, 'id', '') });
          setReportModalVisible(false);
        }}
        visible={reportModalVisible}
        onDismiss={hideReportModal}
        loading={isLoadingReportUser}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    borderRadius: Platform.OS === 'ios' ? 25 : 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: { borderColor: Colors.darkBrown, borderWidth: 1 },
  comment: { fontSize: 16.5, lineHeight: 23, marginLeft: '14%', marginTop: -15 },
  replyText: { marginLeft: '11%' },
  user: { backgroundColor: Colors.transparent, paddingLeft: 0 },
});

export default PostReply;
