import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postCommentsTypesState } from './types';

const initialState: postCommentsTypesState = {
  isLoadingGetPostComments: false,
  postComments: [],
};

const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {
    setPostCommentsAction(state: any, action) {
      state.postComments = action.payload;
    },
    setIsLoadingGetPostCommentsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingGetPostComments = action.payload;
    },
  },
});

export const { setPostCommentsAction, setIsLoadingGetPostCommentsAction } =
  postCommentsSlice.actions;

export const postCommentsSelector = (reducers: any) => reducers.postCommentsReducer;

export default postCommentsSlice.reducer;
