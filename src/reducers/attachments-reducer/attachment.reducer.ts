import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { attachmentsTypesState } from './types';

const initialState: attachmentsTypesState = {
  attachments: [],
  isLoadingAttachments: false,
};

const attachmentsSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
    setAttachmentsAction(state: any, action: PayloadAction<attachmentsTypesState>) {
      state.attachments = action.payload;
    },
    setIsLoadingGetAttchmentsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingAttachments = action.payload;
    },
  },
});

export const { setAttachmentsAction, setIsLoadingGetAttchmentsAction } = attachmentsSlice.actions;

export const attachmentsSelector = (reducers: any) => reducers.attachmentsReducer;

export default attachmentsSlice.reducer;
