import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationProps } from '../../models/app/notifications/notifications.model';
import { notificationsTypesState } from './types';

const initialState: notificationsTypesState = {
  notifications: [],
  isLoadingNotifications: false,
  unOpenedNotifications: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsAction(state: any, action: PayloadAction<Array<NotificationProps>>) {
      state.notifications = action.payload;
    },

    setIsLoadingNotificationsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingNotifications = action.payload;
    },

    setUnOpenedNotificationsAction(state: any, action: PayloadAction<number>) {
      state.unOpenedNotifications = action.payload;
    },
  },
});

export const {
  setNotificationsAction,
  setIsLoadingNotificationsAction,
  setUnOpenedNotificationsAction,
} = notificationsSlice.actions;

export const notificationsSelector = (reducers: any) => reducers.notificationsReducer;

export default notificationsSlice.reducer;
