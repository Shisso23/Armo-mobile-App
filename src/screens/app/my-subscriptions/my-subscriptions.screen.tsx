import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useTheme } from '../../../theme';

import PostItem from '../../../components/molecules/post-item';
import { getPostAction, getPostsAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import _ from 'lodash';

const MySubscriptionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { posts, isLoadingGetPosts, isLoadingGetPost } = useSelector(postsSelector);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState({});
  const { Layout, Gutters } = useTheme();

  const getPosts = () => {
    dispatch(getPostsAction()); //TODO use get subscribed posts endpoint
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

  const renderSubScription = ({ item }: { item: apiPostProps }) => {
    return (
      <PostItem
        item={item}
        handleJoinForum={() => onSelectPost(item)}
        onSelect={() => onSelectPost(item)}
        key={item.id}
        loading={_.get(selectedPost, 'id', null) === item.id && isLoadingGetPost}
      />
    );
  };

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill]}>
      <Text style={[Gutters.regularLMargin, Gutters.smallBMargin, styles.historyTitle]}>
        History
      </Text>
      <FlatList
        contentContainerStyle={[Gutters.smallHMargin, Gutters.largeBPadding]}
        data={posts}
        renderItem={renderSubScription}
        keyExtractor={(item) => String(item.id)}
        onRefresh={getPosts}
        refreshing={isLoadingGetPosts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyTitle: { fontSize: 20, fontWeight: '400' },
});

export default MySubscriptionsScreen;
