import React, { createRef, useState, useLayoutEffect, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
  View,
  Platform,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Share from 'react-native-share';
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
import { deletePostAction, reportUserAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { commentRepliesSelector } from '../../../reducers/comment-replies-reducer/comment-replies.reducer';
import config from '../../../config';
import CustomCarousel from '../../../components/molecules/custom-carousel';
import storageService from '../../../services/sub-services/storage-service/storage.service';
import { getAttchmentsAction } from '../../../reducers/attachments-reducer/attachments.actions';
import { attachmentsSelector } from '../../../reducers/attachments-reducer/attachment.reducer';
import { reportUserTypes } from '../../../services/sub-services/report-user-service/report-user.service';
import SponsorsFooter from '../../../components/molecules/sponsors-footer';

const { width } = Dimensions.get('window');

type ViewPostScreenProps = {
  route: { params: any };
};

const ViewPostScreen: React.FC<ViewPostScreenProps> = ({ route }) => {
  const { params } = route;
  const { post } = params;
  const owner = _.get(post, 'owner', {});
  const attachmentIds = _.get(post, 'attachmentIds', []);
  const dispatch = useDispatch();
  const { isLoadingDeletePost, isLoadingReportUser } = useSelector(postsSelector);
  const { isLoadingDeleteComment } = useSelector(commentRepliesSelector);
  const { attachments, isLoadingAttachments } = useSelector(attachmentsSelector);
  const actionSheetRef = createRef<any>();
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [attachmentSources, setAttachmentSources] = useState([]);
  const navigation = useNavigation();
  const { apiUrl } = config;
  const { Layout, Gutters, Fonts, Common } = useTheme();

  const getAttachmentSources = async () => {
    const token = await storageService.getAccessToken();
    const sources = attachmentIds.map((attachmentId: string) => {
      const result = {
        uri: `${apiUrl}/Posts/${post.id}/attachment/${attachmentId}`,
        timeout: 2000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      return result;
    });

    setAttachmentSources(sources);
  };

  useEffect(() => {
    dispatch(getAttchmentsAction(post.id, attachmentIds));
  }, [attachmentIds, dispatch, post.id]);

  useLayoutEffect(() => {
    getAttachmentSources();
  });

  const openActionSheet = () => {
    actionSheetRef.current.setModalVisible(true);
  };

  const handleShare = () => {
    Share.open({
      urls: attachments,
      title: `Post content`,
      message: _.get(post, 'content', ''),
      subject: `Post content`,
      failOnCancel: false,
    })
      .then(() => {
        hideReportModal();
      })
      .catch((error) => {
        Alert.alert('Oh No!', error.message);
      });
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

  const handleOpenImage = (item: Object) => {
    navigation.navigate('ViewPostMedia', { item, postId: post.id, owner });
  };

  const onDeletePost = async () => {
    await dispatch(deletePostAction(_.get(post, 'id', '')));
    navigation.goBack();
  };

  const onEditPost = () => {
    actionSheetRef.current.setModalVisible(false);
    navigation.navigate('EditPost', { post });
  };

  const reportUserPost = async (formData: reportUserTypes) => {
    await dispatch(reportUserAction(formData));
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

        <TouchableOpacity
          disabled={isLoadingAttachments}
          onPress={openActionSheet}
          style={Layout.row}
        >
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
          handlePostReport={reportUserPost}
        />
        <View style={Gutters.regularHPadding}>
          <Text style={[Fonts.titleTiny, Common.cardTitle, styles.postTitle]}>
            {_.get(post, 'title', '')}
          </Text>
          <ListItem.Subtitle style={(Fonts.textLeft, { lineHeight: 23, fontSize: 16.5 })}>
            {_.get(post, 'content', '').toLowerCase()}
          </ListItem.Subtitle>
          <View
            style={[Layout.alignItemsCenter, Layout.justifyContentCenter, Gutters.smallTMargin]}
          >
            <CustomCarousel sources={attachmentSources} onSelect={handleOpenImage} />
          </View>
          {isLoadingDeletePost ||
            (isLoadingDeleteComment && (
              <ActivityIndicator
                animating={true}
                color={Colors.gray}
                style={Gutters.smallTMargin}
              />
            ))}
        </View>
        <View style={styles.repliesContainer}>
          {renderReplyAndShareButtons()}
          <PostReplies post={post} />
        </View>
        <ReportPostModal
          style={Gutters.largeLMargin}
          handleReport={(reason: string) => {
            reportUserPost({ postId: _.get(post, 'id', ''), reason, commentId: null });
          }}
          visible={reportModalVisible}
          onDismiss={hideReportModal}
          loading={isLoadingReportUser}
        />
      </ScreenContainer>

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
          onEditPress={onEditPost}
          onDeletePress={onDeletePost}
          ownerId={owner.id}
        />
      </ActionSheet>
      <SponsorsFooter />
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    borderRadius: Platform.OS === 'ios' ? 25 : 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  postTitle: { fontWeight: '400' },
  repliesContainer: { paddingBottom: 150 },
  replyText: { color: Colors.white, fontSize: 17 },
  shareAndReplyContainer: { backgroundColor: Colors.tertiary, left: -10, width },
});

export default ViewPostScreen;
