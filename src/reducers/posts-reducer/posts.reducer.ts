import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postsTypesState } from './types';

const initialState: postsTypesState = {
  posts: [],
  isLoadingGetPosts: false,
  isLoadingGetPost: false,
  isLoadingEditPost: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsAction(state: any, action: PayloadAction<postsTypesState>) {
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
  },
});

export const {
  setPostsAction,
  setIsLoadingGetPostAction,
  setIsLoadingGetPostsAction,
  setIsLoadingEditPostAction,
} = postsSlice.actions;

export const postsSelector = (reducers: any) => reducers.postsReducer;

export default postsSlice.reducer;
