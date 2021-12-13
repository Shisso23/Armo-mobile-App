import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import PostItem from '../../../components/molecules/post-item';
import { getMyPostsAction, getPostAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import { postsService } from '../../../services';

const { width } = Dimensions.get('window');

const MyPostsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { myPosts, isLoadingGetMyPosts, isLoadingGetPost } = useSelector(postsSelector);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [extraData, setExtraData] = useState([]);
  const { Layout, Gutters } = useTheme();

  const getPosts = () => {
    dispatch(getMyPostsAction());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getMyPostsAction());
    }, []),
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
      .getMyPosts({ pageNumber, pageSize: 10 })

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
        data={postsWithoutDups([...myPosts, ...extraData])}
        renderItem={renderForum}
        keyExtractor={(item) => String(item.id)}
        onRefresh={getPosts}
        refreshing={isLoadingGetMyPosts}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.2}
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
