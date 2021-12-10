import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import PostItem from '../../../components/molecules/post-item';
import { getPostAction, getPostsAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const { width } = Dimensions.get('window');

const MyPostsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { posts, isLoadingGetPosts, isLoadingGetPost } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState({});
  const { Layout, Gutters } = useTheme();

  const getPosts = () => {
    dispatch(getPostsAction());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getPostsAction());
    }, [dispatch]),
  );

  const filterUsersPosts = () => {
    return posts.filter((post: apiPostProps) => {
      return _.get(post, 'owner.id', '') === _.get(user, 'id', '');
    });
  };

  const getPost = async (id: any) => {
    const post = await dispatch(getPostAction(id));
    if (post) {
      navigation.navigate('ViewPost', { post });
    }
  };

  const onSelectPost = (item: apiPostProps) => {
    setSelectedPost(item);
    getPost(item.id);
  };

  const renderForum = ({ item }: { item: apiPostProps }) => {
    return (
      <PostItem
        item={item}
        handleJoinForum={() => onSelectPost(item)}
        onSelect={() => onSelectPost(item)}
        key={item.id}
        bottomRightText="View Post"
        loading={_.get(selectedPost, 'id', null) === item.id && isLoadingGetPost}
      />
    );
  };

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <Text style={[Gutters.regularLMargin, Gutters.smallBMargin, styles.title]}>My Posts</Text>
      <FlatList
        contentContainerStyle={[Gutters.smallHMargin, Gutters.largeBPadding]}
        data={filterUsersPosts()}
        renderItem={renderForum}
        keyExtractor={(item) => String(item.id)}
        onRefresh={getPosts}
        refreshing={isLoadingGetPosts}
        ListEmptyComponent={<Text style={[Layout.alignSelfCenter]}>There are no posts here!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.07 },
  title: { fontSize: 20, fontWeight: '400' },
});

export default MyPostsScreen;
