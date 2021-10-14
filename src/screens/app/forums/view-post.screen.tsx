import React, { createRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import _ from 'lodash';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import UserInfoBox from '../../../components/molecules/user-info/userInfoBox';
import PostReplies from '../../../components/molecules/post-replies';
import ShareActionContent from '../../../components/molecules/share-action-content';
import ReportPostModal from '../../../components/molecules/report-post-modal';
import { deletePostAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { commentRepliesSelector } from '../../../reducers/comment-replies-reducer/comment-replies.reducer';

const { width } = Dimensions.get('window');

type ViewPostScreenProps = {
  route: { params: any };
};

const imageUri = 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg';

const ViewPostScreen: React.FC<ViewPostScreenProps> = ({ route }) => {
  const { params } = route;
  const { post } = params;
  const owner = _.get(post, 'owner', {});
  const dispatch = useDispatch();
  const { isLoadingDeletePost } = useSelector(postsSelector);
  const { isLoadingDeleteComment } = useSelector(commentRepliesSelector);
  const actionSheetRef = createRef<any>();
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const navigation = useNavigation();
  const { Layout, Gutters, Fonts, Common } = useTheme();

  const openActionSheet = () => {
    actionSheetRef.current.setModalVisible(true);
  };

  const handleClipBoardCopy = () => {
    Clipboard.setString(_.get(post, 'content', ''));
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

  const handleOpenImage = () => {
    navigation.navigate('PostImage', { uri: imageUri });
  };

  const onDeletePost = async () => {
    await dispatch(deletePostAction(_.get(post, 'id', '')));
    navigation.goBack();
  };

  const onEditPost = () => {
    actionSheetRef.current.setModalVisible(false);
    navigation.navigate('EditPost', { post });
  };

  const renderReplyAndShareButtons = () => {
    return (
      <ListItem
        containerStyle={[
          Gutters.regularVMargin,
          Gutters.regularHPadding,
          styles.shareAndReplyContainer,
        ]}
      >
        <Icon name="reply" color={Colors.white} style={Gutters.tinyLMargin} />
        <ListItem.Content>
          <Pressable
            hitSlop={{ left: 40, right: 20 }}
            onPress={() => navigation.navigate('ReplyToPost', { post, isPostReply: true })}
          >
            {() => <Text style={styles.replyText}>Reply</Text>}
          </Pressable>
        </ListItem.Content>

        <TouchableOpacity onPress={openActionSheet} style={Layout.row}>
          <Icon name="share" color={Colors.white} />
          <ListItem.Title
            style={[Gutters.smallHMargin, Gutters.tinyTMargin, { color: Colors.white }]}
          >
            Share
          </ListItem.Title>
        </TouchableOpacity>
      </ListItem>
    );
  };

  return (
    <>
      <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
        <UserInfoBox
          post={post}
          user={owner}
          handlePostDelete={onDeletePost}
          handlePostEdit={onEditPost}
        />
        <View style={Gutters.regularHPadding}>
          <Text style={[Fonts.titleTiny, Common.cardTitle, styles.postTitle]}>
            {_.get(post, 'title', '')}
          </Text>
          <ListItem.Subtitle style={(Fonts.textLeft, { lineHeight: 23, fontSize: 16.5 })}>
            {_.get(post, 'content', '').toLowerCase()}
          </ListItem.Subtitle>
          <Pressable onPress={handleOpenImage}>
            {() => (
              <Image
                source={{
                  uri: imageUri, //TODO use attachment API to get post attachment
                }}
                style={[Gutters.regularTMargin, Layout.alignSelfCenter, styles.image]}
              />
            )}
          </Pressable>
          <ActivityIndicator
            animating={isLoadingDeletePost || isLoadingDeleteComment}
            color={Colors.gray}
            style={Gutters.smallTMargin}
          />
        </View>
        <View>
          {renderReplyAndShareButtons()}
          <PostReplies post={post} />
        </View>
        <ReportPostModal
          style={Gutters.largeLMargin}
          handleReport={() => {}}
          visible={reportModalVisible}
          onDismiss={hideReportModal}
        />
      </ScreenContainer>

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
          onEditPress={onEditPost}
          onDeletePress={onDeletePost}
        />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: { borderRadius: 25 },
  image: { height: 150, width: 120 },
  postTitle: { fontWeight: '400' },
  replyText: { color: Colors.white, fontSize: 17 },
  shareAndReplyContainer: { backgroundColor: Colors.tertiary, left: -10, width },
});

export default ViewPostScreen;
