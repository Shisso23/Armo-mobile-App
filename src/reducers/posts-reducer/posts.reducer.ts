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
} = postsSlice.actions;

export const postsSelector = (reducers: any) => reducers.postsReducer;

export default postsSlice.reducer;
