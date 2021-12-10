import React, { useState, useCallback, createRef } from 'react';
import { View, StyleSheet, FlatList, Keyboard, Platform } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import CategoryActionSheet from '../../../components/molecules/category-action-sheet-content';
import SearchBar from '../../../components/atoms/search-bar';
import PostItem from '../../../components/molecules/post-item';
import {
  getCategoriesAction,
  getPostAction,
  getPostsAction,
} from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import SponsorsFooter from '../../../components/molecules/sponsors-footer';
import _ from 'lodash';

const ForumsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { posts, isLoadingGetPosts, isLoadingGetPost, categories } = useSelector(postsSelector);
  const dispatch = useDispatch();
  const [actionSheetIsVisible, setActionSheetIsVisible] = useState(false);
  const actionSheetRef = createRef<any>();
  const [searchResult, setSearchResult] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const { Layout, Gutters, Common, Fonts } = useTheme();

  const getPosts = () => {
    dispatch(getPostsAction());
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getPostsAction());
      dispatch(getCategoriesAction());
    }, [dispatch]),
  );

  const getPost = async (id: any) => {
    const post = await dispatch(getPostAction(id));
    if (post) {
      navigation.navigate('ViewPost', { post });
    }
  };

  const handleJoinForum = () => {};

  const handleFilterPress = () => {
    Keyboard.dismiss();
    setActionSheetIsVisible(true);
    actionSheetRef.current.setModalVisible(true);
  };

  const searchForums = (searchKeyWord: string) => {
    setSearchText(searchKeyWord);
    const results = posts.filter(
      (post: apiPostProps) =>
        post.title.includes(searchKeyWord) || post.summary.includes(searchKeyWord),
    );
    setSearchResult(results);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const onActionSheetClose = () => {
    setActionSheetIsVisible(false);
  };

  const renderForum = ({ item }: { item: apiPostProps }) => {
    return (
      <PostItem
        item={item}
        handleJoinForum={handleJoinForum}
        onSelect={(post: apiPostProps) => {
          setSelectedPost(item);
          getPost(post.id);
        }}
        key={item.id}
        loading={_.get(selectedPost, 'id', null) === item.id && isLoadingGetPost}
        bottomRightText="Join Forum"
      />
    );
  };

  return (
    <>
      <Text style={[Gutters.regularMargin, Fonts.titleSmall, styles.title]}>Community</Text>
      <View style={[Layout.rowCenter, Gutters.largeHMargin]}>
        <SearchBar
          value={searchText}
          clearSearch={clearSearch}
          onChangeTex={searchForums}
          placeHolder="Search forums"
        />

        <Icon
          name={actionSheetIsVisible ? 'filter' : 'equalizer'}
          type={actionSheetIsVisible ? 'feather' : 'simple-line-icon'}
          onPress={handleFilterPress}
          color={Colors.gray}
          size={27}
          containerStyle={[
            Common.inputWithRoundBorders,
            Gutters.smallPadding,
            styles.filterIconContainer,
            actionSheetIsVisible && { transform: [] },
          ]}
        />
      </View>
      <>
        <FlatList
          contentContainerStyle={[Gutters.smallHMargin, Gutters.largeBPadding, styles.forumsList]}
          data={searchText.length > 0 ? searchResult : posts}
          renderItem={renderForum}
          keyExtractor={(item) => String(item.id)}
          onRefresh={getPosts}
          refreshing={isLoadingGetPosts}
        />
      </>
      <FAB
        style={[Common.fabAlignment, styles.fab]}
        icon="plus"
        color={Colors.white}
        onPress={() => navigation.navigate('CreatePost')}
      />
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheet}
        onClose={onActionSheetClose}
      >
        <CategoryActionSheet showResults={() => {}} categories={categories} />
      </ActionSheet>
      <SponsorsFooter />
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    borderRadius: Platform.OS === 'ios' ? 25 : 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fab: { backgroundColor: Colors.secondary, borderRadius: 10 },
  filterIconContainer: {
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    bottom: '2.2%',
    padding: 10,
    right: '25%',
    transform: [{ rotate: '90deg' }],
  },
  forumsList: {
    paddingBottom: 200,
  },
  title: { fontWeight: '500', marginLeft: '5%' },
});

export default ForumsScreen;
