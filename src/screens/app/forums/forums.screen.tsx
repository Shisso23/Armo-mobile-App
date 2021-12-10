import React, { useState, useCallback, createRef, useMemo } from 'react';
import { View, StyleSheet, FlatList, Keyboard, Platform, Alert } from 'react-native';
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
  subscribeToPostAction,
  unsubscribeToPostAction,
} from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { apiPostProps } from '../../../models';
import SponsorsFooter from '../../../components/molecules/sponsors-footer';
import _ from 'lodash';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { getPostsTypes } from '../../../services/sub-services/posts/posts.service';

const ForumsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const {
    posts,
    isLoadingGetPosts,
    isLoadingGetPost,
    categories,
    isLoadingSubscribeToPost,
    isLoadingUnsubscribeToPost,
  } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [actionSheetIsVisible, setActionSheetIsVisible] = useState(false);
  const [filterParams, setFilterParams] = useState<getPostsTypes>({
    categories: null,
    ascendingOrder: null,
    pageSize: null,
  });
  const actionSheetRef = createRef<any>();
  const [selectedPost, setSelectedPost] = useState({});
  const { Layout, Gutters, Common, Fonts } = useTheme();

  const debounce = useMemo(
    () =>
      _.throttle(
        async (searchKeyWord: string) => {
          await dispatch(
            getPostsAction({
              keyword: searchKeyWord,
              pageSize: 15,
            }),
          );
        },
        1500,
        undefined,
      ),
    [dispatch],
  );

  const getPosts = () => {
    dispatch(getPostsAction(filterParams));
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getPostsAction(filterParams));
      dispatch(getCategoriesAction());
    }, [dispatch, filterParams]),
  );

  const getPost = async (id: any) => {
    const post = await dispatch(getPostAction(id));
    if (post) {
      navigation.navigate('ViewPost', { post });
    }
  };

  const filterCategories = async (selectedCategories: Array<string>, order: string) => {
    setFilterParams({
      categories: selectedCategories,
      ascendingOrder: order === 'Old',
      pageSize: 15,
    });
    await dispatch(
      getPostsAction({
        categories: selectedCategories,
        ascendingOrder: order === 'Old',
        pageSize: 15,
      }),
    );
  };

  const handleJoinForum = async (post: apiPostProps) => {
    setSelectedPost(post);
    if (getSubscribeStatus(post) === 'Subscribed') {
      Alert.alert(
        'Are you sure?',
        'Unsubscribe from this forum?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async () => await dispatch(unsubscribeToPostAction(post.id)),
          },
        ],
        { cancelable: false },
      );
    } else {
      await dispatch(subscribeToPostAction(post.id));
    }
  };

  const handleFilterPress = () => {
    Keyboard.dismiss();
    setActionSheetIsVisible(true);
    actionSheetRef.current.setModalVisible(true);
  };

  const clearSearch = () => {
    setSearchText('');
    getPosts();
  };

  const onActionSheetClose = () => {
    setActionSheetIsVisible(false);
  };

  const getSubscribeStatus = (post: apiPostProps) => {
    if (_.get(post, 'owner.id', '') === _.get(user, 'id', '')) {
      return null;
    }
    if (_.get(post, 'isSubscribed', false)) {
      return 'Subscribed';
    } else {
      return 'Join forum';
    }
  };

  const renderForum = ({ item }: { item: apiPostProps }) => {
    return (
      <PostItem
        item={item}
        loadingSubscribeToPost={
          _.get(selectedPost, 'id', null) === item.id &&
          (isLoadingSubscribeToPost || isLoadingUnsubscribeToPost)
        }
        handleJoinForum={() => handleJoinForum(item)}
        onSelect={(post: apiPostProps) => {
          setSelectedPost(item);
          getPost(post.id);
        }}
        key={item.id}
        loading={_.get(selectedPost, 'id', null) === item.id && isLoadingGetPost}
        bottomRightText={getSubscribeStatus(item)}
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
          onChangeTex={(text: string) => {
            setSearchText(text);
            debounce(text);
          }}
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
          data={posts}
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
        <CategoryActionSheet
          showResults={filterCategories}
          categories={categories}
          isLoadingGetPosts={isLoadingGetPosts}
        />
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
