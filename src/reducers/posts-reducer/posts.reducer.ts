import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postsTypesState } from './types';

const initialState: postsTypesState = {
  posts: [],
  myPosts: [],
  isLoadingGetMyPosts: false,
  subscribedPosts: [],
  isLoadingGetSubscribedPosts: false,
  isLoadingGetPosts: false,
  isLoadingGetPost: false,
  isLoadingEditPost: false,
  isLoadingDeletePost: false,
  categories: [],
  isLoadingCategories: false,
  isLoadingSubscribeToPost: false,
  isLoadingUnsubscribeToPost: false,
  isLoadingReportUser: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsAction(state: any, action: PayloadAction<Array<Object>>) {
      state.posts = action.payload;
    },
    setIsLoadingGetPostsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingGetPosts = action.payload;
    },

    setMyPostsAction(state: any, action: PayloadAction<Array<Object>>) {
      state.myPosts = action.payload;
    },
    setIsLoadingGetMyPostsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingGetMyPosts = action.payload;
    },

    setSubscribedPostsAction(state: any, action: PayloadAction<Array<Object>>) {
      state.subscribedPosts = action.payload;
    },
    setIsLoadingGetSubscribedPostsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingGetSubscribedPosts = action.payload;
    },

    setIsLoadingGetPostAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingGetPost = action.payload;
    },
    setIsLoadingEditPostAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingEditPost = action.payload;
    },
    setIsLoadingDeletePostAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingDeletePost = action.payload;
    },

    setCategoriesAction(state: any, action: PayloadAction<Array<{ id: string; name: string }>>) {
      state.categories = action.payload;
    },

    setIsLoadingCategoriesAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingCategories = action.payload;
    },

    setIsLoadingSubscribeToPostAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingSubscribeToPost = action.payload;
    },
    setIsLoadingUnsubscribeToPostAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingUnsubscribeToPost = action.payload;
    },
    setIsLoadingReportUserAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingReportUser = action.payload;
    },
  },
});

export const {
  setPostsAction,
  setIsLoadingGetPostAction,
  setIsLoadingGetPostsAction,
  setIsLoadingEditPostAction,
  setIsLoadingDeletePostAction,
  setCategoriesAction,
  setIsLoadingCategoriesAction,
  setIsLoadingSubscribeToPostAction,
  setIsLoadingUnsubscribeToPostAction,
  setIsLoadingReportUserAction,
  setMyPostsAction,
  setIsLoadingGetMyPostsAction,
  setIsLoadingGetSubscribedPostsAction,
  setSubscribedPostsAction,
} = postsSlice.actions;

export const postsSelector = (reducers: any) => reducers.postsReducer;

export default postsSlice.reducer;
