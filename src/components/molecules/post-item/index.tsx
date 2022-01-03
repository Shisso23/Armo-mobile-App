import _ from 'lodash';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { List, ActivityIndicator } from 'react-native-paper';

import { apiPostProps } from '../../../models';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

type PostItemProps = {
  item: apiPostProps;
  handleJoinForum: any;
  onSelect: any;
  loading: boolean;
  bottomRightText?: string | null;
  loadingSubscribeToPost?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  item,
  handleJoinForum,
  onSelect,
  loading,
  bottomRightText,
  loadingSubscribeToPost,
}) => {
  const { Layout, Common, Gutters } = useTheme();
  const renderDescription = () => (
    <View style={Gutters.smallTMargin}>
      <Text style={Common.cardDescription}>{item.summary}</Text>
      <ActivityIndicator
        size={25}
        style={[Layout.alignSelfCenter, styles.activityIndicator]}
        animating={loading}
        color={Colors.fourtyPercentSecondary}
      />

      <View style={Layout.rowBetween}>
        <Text
          style={[Layout.alignSelfStart, Gutters.smallTMargin, styles.joinForumText, Common.link]}
        >
          {_.get(item, 'category.name', '')}
        </Text>
        {bottomRightText && (
          <TouchableOpacity
            style={[Layout.row, Layout.alignSelfEnd, Gutters.smallTMargin]}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={handleJoinForum}
          >
            <Text
              style={[
                Common.link,
                { color: Colors.fourtyPercentSecondary },
                Gutters.tinyRMargin,
                styles.joinForumText,
              ]}
            >
              {bottomRightText}
            </Text>
            {loadingSubscribeToPost ? (
              <ActivityIndicator
                animating={loadingSubscribeToPost}
                color={Colors.secondary}
                style={Gutters.tinyTMargin}
                size={12}
              />
            ) : (
              <Icon
                name="arrow-right-circle"
                type="feather"
                color={Colors.fourtyPercentSecondary}
                size={14}
                containerStyle={styles.joinForumIcon}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={[Common.inputWithRoundBorders, Gutters.tinyMargin, styles.forumItem]}>
      <List.Item
        title={item.title.toLocaleLowerCase()}
        titleNumberOfLines={2}
        titleStyle={Common.cardTitle}
        description={renderDescription}
        onPress={() => onSelect(item)}
        descriptionNumberOfLines={10}
        descriptionStyle={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: { position: 'absolute' },
  forumItem: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  joinForumIcon: { marginTop: 3 },
  joinForumText: { fontWeight: '300' },
});

export default PostItem;
