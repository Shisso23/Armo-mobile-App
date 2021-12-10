import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentRepliesTypesState } from './types';

const initialState: commentRepliesTypesState = {
  isLoadingDeleteComment: false,
};

const commentRepliesSlice = createSlice({
  name: 'commentReplies',
  initialState,
  reducers: {
    setIsLoadingDeleteCommentAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingDeleteComment = action.payload;
    },
  },
});

export const { setIsLoadingDeleteCommentAction } = commentRepliesSlice.actions;

export const commentRepliesSelector = (reducers: any) => reducers.commentRepliesReducer;

export default commentRepliesSlice.reducer;
