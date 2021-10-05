import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { Icon, ListItem, Divider } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import _ from 'lodash';
import PostReply from '../../../components/molecules/post-reply';

const { width } = Dimensions.get('window');

type PostRepliesProps = {
  post: Object;
};

const PostReplies: React.FC<PostRepliesProps> = ({ post }) => {
  const { Gutters } = useTheme();
  const [repliesExpanded, setRepliesExpanded] = useState(false);

  const renderPostReplies = ({ item, index }: { item: Object; index: number }) => {
    return (
      <>
        <PostReply reply={item} user={_.get(item, 'user', {})} />
        {index < _.get(post, 'replies', []).length - 1 && <Divider style={styles.postDivider} />}
      </>
    );
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
        onPress={() => {
          setRepliesExpanded(!repliesExpanded);
        }}
      >
        <View style={Gutters.tinyHPadding}>
          <Divider style={styles.fullDivider} />
          <Text style={[Gutters.smallMargin, styles.warning]}>
            Remember to keep comments respectful and to follow our Community Guidelines
          </Text>
          <Divider style={styles.fullDivider} />
          <FlatList data={_.get(post, 'replies', [])} renderItem={renderPostReplies} />
        </View>
      </ListItem.Accordion>
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
