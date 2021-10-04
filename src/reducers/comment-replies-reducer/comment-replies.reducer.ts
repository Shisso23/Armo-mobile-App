import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentRepliesTypesState } from './types';

const initialState: commentRepliesTypesState = {
  upVotes: 0,
  downVotes: 0,
  isLoadingDeleteComment: false,
};

const commentRepliesSlice = createSlice({
  name: 'commentReplies',
  initialState,
  reducers: {
    setUpVotesAction(state: any, action: PayloadAction<commentRepliesTypesState>) {
      state.upVotes = action.payload;
    },
    setDownVotesAction(state: any, action: PayloadAction<commentRepliesTypesState>) {
      state.downVotes = action.payload;
    },
    setIsLoadingDeleteCommentAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingDeleteComment = action.payload;
    },
  },
});

export const { setUpVotesAction, setDownVotesAction, setIsLoadingDeleteCommentAction } =
  commentRepliesSlice.actions;

export const commentRepliesSelector = (reducers: any) => reducers.commentRepliesReducer;

export default commentRepliesSlice.reducer;
