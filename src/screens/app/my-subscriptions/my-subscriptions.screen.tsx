import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { useTheme } from '../../../theme';

import PostItem from '../../../components/molecules/post-item';
import {
  getPostAction,
  getSubscribedPostsAction,
} from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import _ from 'lodash';
import { postsService } from '../../../services';

const MySubscriptionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { subscribedPosts, isLoadingGetSubscribedPosts, isLoadingGetPost } =
    useSelector(postsSelector);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [extraData, setExtraData] = useState([]);
  const { Layout, Gutters } = useTheme();

  const getPosts = () => {
    dispatch(getSubscribedPostsAction());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getSubscribedPostsAction());
    }, [dispatch]),
  );

  const getPost = async (id: any) => {
    const post = await dispatch(getPostAction(id));
    if (post) {
      navigation.navigate('ViewPost', { post });
    }
  };

  const postsWithoutDups = (allPosts: Array<apiPostProps>) => {
    return [
      ...new Map(allPosts.map((post: apiPostProps) => [_.get(post, 'id', ''), post])).values(),
    ];
  };

  const fetchMorePosts = async () => {
    postsService
      .getSubscribedPosts({ pageNumber, pageSize: 10 })

      .then((resp) => {
        setExtraData(resp.items);
        if (_.get(resp, 'hasNextPage', false)) {
          setPageNumber(pageNumber + 1);
        }
      });
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
        data={postsWithoutDups([...subscribedPosts, ...extraData])}
        renderItem={renderSubScription}
        keyExtractor={(item) => String(item.id)}
        onRefresh={getPosts}
        refreshing={isLoadingGetSubscribedPosts}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={<Text style={[Layout.alignSelfCenter]}>There are no posts here!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  historyTitle: { fontSize: 20, fontWeight: '400' },
});

export default MySubscriptionsScreen;
