import {
  setIsLoadingNotificationsAction,
  setNotificationsAction,
  setUnOpenedNotificationsAction,
} from './notifications.reducer';
import { flashService } from '../../services';
import { notificationsService } from '../../services';
import _ from 'lodash';
import { NotificationProps } from '../../models/app/notifications/notifications.model';

export const getNotificationsAction = () => async (dispatch: Function) => {
  dispatch(setIsLoadingNotificationsAction(true));
  try {
    const response: Array<NotificationProps> = await notificationsService.getNotifications();
    dispatch(setNotificationsAction(response));
    const unOpenedNotifications = response.reduce((total, notification: NotificationProps) => {
      return !notification.seen ? (total = total + 1) : total;
    }, 0);
    dispatch(setUnOpenedNotificationsAction(unOpenedNotifications));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  } finally {
    dispatch(setIsLoadingNotificationsAction(false));
  }
};

export const getUnreadNotificationsAction = () => async (dispatch: Function) => {
  try {
    const response: number = await notificationsService.getUnreadNotifications();
    dispatch(setUnOpenedNotificationsAction(response));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  }
};

export const markAsReadAction = async (notidicationId: string) => {
  try {
    const response = await notificationsService.makeAsRead(notidicationId);
    return response;
  } catch (error) {
    return flashService.error(_.get(error, 'message', ''));
  }
};
