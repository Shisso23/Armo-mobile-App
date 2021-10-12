import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationsTypesState } from './types';

const initialState: notificationsTypesState = {
  notifications: [],
  isLoadingNotifications: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsAction(state: any, action: PayloadAction<notificationsTypesState>) {
      state.notifications = action.payload;
    },

    setIsLoadingNotificationsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingNotifications = action.payload;
    },
  },
});

export const { setNotificationsAction, setIsLoadingNotificationsAction } =
  notificationsSlice.actions;

export const notificationsSelector = (reducers: any) => reducers.notificationsReducer;

export default notificationsSlice.reducer;
