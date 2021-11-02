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
};

const PostItem: React.FC<PostItemProps> = ({ item, handleJoinForum, onSelect, loading }) => {
  const { Layout, Common, Gutters } = useTheme();

  return (
    <View style={[Common.inputWithRoundBorders, Gutters.tinyMargin, styles.forumItem]}>
      <List.Item
        title={item.title.toLocaleLowerCase()}
        titleNumberOfLines={2}
        titleStyle={Common.cardTitle}
        description={() => (
          <View style={Gutters.smallTMargin}>
            <Text style={Common.cardDescription}>{item.summary}</Text>
            <ActivityIndicator
              size={35}
              style={[Layout.alignSelfCenter, styles.activityIndicator]}
              animating={loading}
              color={Colors.secondary}
            />
            <TouchableOpacity
              style={[Layout.row, Layout.alignSelfEnd, Gutters.smallTMargin]}
              onPress={handleJoinForum}
            >
              <Text style={[Common.link, Gutters.tinyRMargin, styles.joinForumText]}>
                Join Forum
              </Text>
              <Icon
                name="arrow-right-circle"
                type="feather"
                color={Colors.secondary}
                iconStyle={styles.iconsOpacity}
                size={14}
                containerStyle={styles.joinForumIcon}
              />
            </TouchableOpacity>
          </View>
        )}
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
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  iconsOpacity: { opacity: 0.72 },
  joinForumIcon: { marginTop: 3 },
  joinForumText: { fontWeight: '300' },
});

export default PostItem;
