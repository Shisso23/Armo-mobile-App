import React, { useState, createRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import moment from 'moment';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../..';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShareActionContent from '../share-action-content';
import ReportPostModal from '../report-post-modal';

type PostReplyProps = {
  reply: Object;
  user: Object;
  key?: any;
};

const { width } = Dimensions.get('window');

const PostReply: React.FC<PostReplyProps> = ({ reply, user }) => {
  const { Gutters, Fonts, Layout } = useTheme();
  const [upVotes, setUpVotes] = useState(0);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [downVotes, setDownVotes] = useState(0);
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
    Clipboard.setString(_.get(reply, 'description', ''));
    actionSheetRef.current.setModalVisible(false);
    Alert.alert('Copied');
  };

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

  const renderVotes = (type: String, numberOfVotes: Number) => {
    return (
      <View style={Layout.row}>
        <Icon
          onPress={() => {
            type === 'upVote' ? setUpVotes(upVotes + 1) : setDownVotes(downVotes + 1);
          }}
          name={type === 'upVote' ? 'chevron-up-circle-outline' : 'chevron-down-circle-outline'}
          type="material-community"
        />
        <Text style={[Gutters.smallLMargin, Gutters.tinyTMargin]}>{numberOfVotes}</Text>
      </View>
    );
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
            _.get(reply, 'date', new Date()),
          )}`}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem.Subtitle style={[Fonts.textLeft, styles.comment]}>
        {_.get(reply, 'comment', '-')}
      </ListItem.Subtitle>

      <ListItem containerStyle={[styles.user, Gutters.regularTMargin, styles.replyText]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReplyToPost', { post: reply });
          }}
          style={[Fonts.textLeft, styles.comment, Gutters.regularTPadding]}
        >
          <Text>Reply</Text>
        </TouchableOpacity>

        {renderVotes('upVote', upVotes)}
        {renderVotes('downVote', downVotes)}
        <Icon
          name="dots-horizontal"
          type="material-community"
          style={{ marginLeft: width * 0.2 }}
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
          onSharePress={() => {}}
          onCopyPress={handleClipBoardCopy}
          onReportPress={handleReportPress}
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
