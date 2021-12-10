import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postsTypesState } from './types';

const initialState: postsTypesState = {
  posts: [],
  isLoadingGetPosts: false,
  isLoadingGetPost: false,
  isLoadingEditPost: false,
  isLoadingDeletePost: false,
  categories: [],
  isLoadingCategories: false,
  isLoadingSubscribeToPost: false,
  isLoadingUnsubscribeToPost: false,
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
} = postsSlice.actions;

export const postsSelector = (reducers: any) => reducers.postsReducer;

export default postsSlice.reducer;
