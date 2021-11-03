import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useTheme } from '../../../theme';

import PostItem from '../../../components/molecules/post-item';
import { getPostAction, getPostsAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import _ from 'lodash';

const { width } = Dimensions.get('window');

const MyPostsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { posts, isLoadingGetPosts, isLoadingGetPost } = useSelector(postsSelector);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState({});
  const { Layout, Gutters } = useTheme();

  const getPosts = () => {
    dispatch(getPostsAction()); //TODO should use the get user's posts endpoint
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getPostsAction());
    }, [dispatch]),
  );

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
      <View style={[Layout.alignSelfStart, Gutters.largeBMargin]}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          onPress={() => navigation.goBack()}
        />
      </View>
      <FlatList
        contentContainerStyle={[Gutters.smallHMargin, Gutters.largeBPadding]}
        data={posts}
        renderItem={renderForum}
        keyExtractor={(item) => String(item.id)}
        onRefresh={getPosts}
        refreshing={isLoadingGetPosts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
});

export default MyPostsScreen;
