import React, { useState, createRef } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
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
import { commentRepliesSelector } from '../../../reducers/comment-replies-reducer/comment-replies.reducer';
import { deleteCommentAction } from '../../../reducers/comment-replies-reducer/comment-replies.actions';

type PostReplyProps = {
  reply: Object;
  user: Object;
  key?: any;
};

const PostReply: React.FC<PostReplyProps> = ({ reply, user }) => {
  const { Gutters, Fonts, Layout } = useTheme();
  const dispatch = useDispatch();
  const [voteType, setVoteType] = useState('');
  const { totalUpVotes, totalDownVotes } = useSelector(commentRepliesSelector);
  const [upVoted, setUpVoted] = useState(0);
  const [downVoted, setDownVoted] = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const actionSheetRef = createRef<any>();
  const navigation = useNavigation();

  const nestedComments = _.get(reply, 'replies', []).map((chilComment: any, index: Number) => {
    return (
      <PostReply
        key={_.get(chilComment, 'id', index)}
        reply={chilComment}
        user={_.get(chilComment, 'user', {})}
      />
    );
  });
  const formatDate = (date: any) => {
    return moment(date).fromNow();
  };

  const handleClipBoardCopy = () => {
    Clipboard.setString(_.get(reply, 'content', ''));
    actionSheetRef.current.setModalVisible(false);
    Alert.alert('Copied');
  };
  const upVote = async () => {
    setVoteType('upVote');
    setUpVoted(1);
    setDownVoted(0);

    await commentsService.upVoteComment(_.get(reply, 'id', ''));
  };

  const downVote = async () => {
    setVoteType('downVote');
    setDownVoted(1);
    setUpVoted(0);
    await commentsService.downVoteComment(_.get(reply, 'id', ''));
  };

  const getVotes = (type: string) => {
    switch (type) {
      case 'upVote':
        return totalUpVotes + upVoted;
      case 'downVote':
        return totalDownVotes + downVoted;

      default:
        return 0;
    }
  };

  const editComment = () => {
    actionSheetRef.current.setModalVisible(false);
    navigation.navigate('EditComment', { comment: reply });
  };

  const deleteComment = () => {
    dispatch(deleteCommentAction(_.get(reply, 'id', '')));
  };

  const getVotesBgColor = (type: string) => {
    switch (voteType) {
      case type:
        return Colors.secondary;

      default:
        return Colors.black;
    }
  };

  const debounceDownVote = _.debounce(downVote, 800, {
    leading: false,
    trailing: true,
  });

  const debounceUpVote = _.debounce(() => upVote(), 800, {
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

  const renderVotes = (type: string) => {
    return (
      <View style={Layout.row}>
        <Icon
          onPress={() => {
            type === 'upVote' ? debounceUpVote() : debounceDownVote();
          }}
          color={getVotesBgColor(type)}
          name={type === 'upVote' ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'}
          type="material-community"
        />
        <Text style={[Gutters.smallLMargin, Gutters.tinyTMargin]}>{getVotes(type)}</Text>
      </View>
    );
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
          <ListItem.Title>{`${_.get(user, 'name', '')} ${formatDate(
            _.get(reply, 'date', new Date()), // TODO
          )}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem.Subtitle style={[Fonts.textLeft, styles.comment]}>
        {_.get(reply, 'content', '')}
      </ListItem.Subtitle>

      <ListItem containerStyle={[styles.user, Gutters.regularTMargin, styles.replyText]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReplyToPost', { post: reply, isPostReply: false });
          }}
          style={[Fonts.textLeft, styles.comment, Gutters.regularTPadding]}
        >
          <Text>Reply</Text>
        </TouchableOpacity>

        {renderVotes('upVote')}
        {renderVotes('downVote')}
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
          ownerId={_.get(reply, 'ownerId', '')}
        />
      </ActionSheet>
      <ReportPostModal
        style={Gutters.regularLMargin}
        handleReport={() => {}}
        visible={reportModalVisible}
        onDismiss={hideReportModal}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  actionSheet: { borderRadius: 25 },
  avatar: { borderColor: Colors.darkBrown, borderWidth: 1 },
  comment: { fontSize: 16.5, lineHeight: 23, marginLeft: '14%', marginTop: -15 },
  replyText: { marginLeft: '11%' },
  user: { backgroundColor: Colors.transparent, paddingLeft: 0 },
});

export default PostReply;
