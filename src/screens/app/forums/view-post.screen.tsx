import React from 'react';
import { StyleSheet, Text, Image, Pressable, Dimensions } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import UserInfoBox from '../../../components/molecules/user-info/userInfoBox';
import _ from 'lodash';
import PostReplies from '../../../components/molecules/post-replies';

const { width } = Dimensions.get('window');

type ViewPostScreenProps = {
  route: { params: any };
};

const ViewPostScreen: React.FC<ViewPostScreenProps> = ({ route }) => {
  const { params } = route;
  const { post } = params;
  const user = { name: 'Hyacinthe Shisso' };
  const { Layout, Gutters, Fonts } = useTheme();

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
          <Text style={styles.replyText}>Reply</Text>
        </ListItem.Content>
        <Icon name="share" color={Colors.white} />
        <ListItem.Title style={[Gutters.smallRMargin, { color: Colors.white }]}>
          Share
        </ListItem.Title>
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
    </>
  );
};

const styles = StyleSheet.create({
  replyText: { color: Colors.white, fontSize: 17 },
  // eslint-disable-next-line react-native/no-color-literals
  shareAndReplyContainer: { backgroundColor: '#EF7C0B', left: -10, width },
});

export default ViewPostScreen;
