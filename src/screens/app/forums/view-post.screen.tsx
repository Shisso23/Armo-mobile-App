import React, { createRef } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/core';
import Clipboard from '@react-native-community/clipboard';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import UserInfoBox from '../../../components/molecules/user-info/userInfoBox';
import _ from 'lodash';
import PostReplies from '../../../components/molecules/post-replies';
import ShareActionContent from '../../../components/molecules/share-action-content';

const { width } = Dimensions.get('window');

type ViewPostScreenProps = {
  route: { params: any };
};

const ViewPostScreen: React.FC<ViewPostScreenProps> = ({ route }) => {
  const { params } = route;
  const { post } = params;
  const user = { name: 'Hyacinthe Shisso' };
  const actionSheetRef = createRef<any>();
  const navigation = useNavigation();
  const { Layout, Gutters, Fonts } = useTheme();

  const openActionSheet = () => {
    actionSheetRef.current.setModalVisible(true);
  };

  const handleClipBoardCopy = () => {
    Clipboard.setString(_.get(post, 'description', ''));
    actionSheetRef.current.setModalVisible(false);
    Alert.alert('Copied');
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
        <Icon
          onPress={() => navigation.navigate('ReplyToPost', { post })}
          name="reply"
          color={Colors.white}
          style={Gutters.tinyLMargin}
        />
        <ListItem.Content>
          <Pressable onPress={() => navigation.navigate('ReplyToPost', { post })}>
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
  const handleOpenImage = () => {};

  return (
    <>
      <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
        <UserInfoBox post={post} user={user} />
        <ListItem.Content style={Gutters.regularHPadding}>
          <Text style={Fonts.titleTiny}>{_.get(post, 'title', '')}</Text>
          <ListItem.Subtitle style={(Fonts.textLeft, { lineHeight: 23, fontSize: 16.5 })}>
            {_.get(post, 'description', '-')}
          </ListItem.Subtitle>
          <Pressable onPress={handleOpenImage}>
            {() => (
              <Image
                source={_.get(post, 'image', null)}
                style={[Gutters.regularTMargin, Layout.alignSelfCenter]}
              />
            )}
          </Pressable>
        </ListItem.Content>
        {renderReplyAndShareButtons()}
        <PostReplies post={post} />
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
          onReportPress={() => {}}
        />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: { borderRadius: 25 },
  replyText: { color: Colors.white, fontSize: 17 },
  // eslint-disable-next-line react-native/no-color-literals
  shareAndReplyContainer: { backgroundColor: '#EF7C0B', left: -10, width },
});

export default ViewPostScreen;
