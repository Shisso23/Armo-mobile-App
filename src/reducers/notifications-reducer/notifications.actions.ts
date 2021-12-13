import { setIsLoadingNotificationsAction, setNotificationsAction } from './notifications.reducer';
import { flashService } from '../../services';
import { notificationsService } from '../../services';
import _ from 'lodash';

export const getNotificationsAction = () => async (dispatch: Function) => {
  dispatch(setIsLoadingNotificationsAction(true));
  try {
    const response = await notificationsService.getNotifications();
    dispatch(setNotificationsAction(response));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  } finally {
    dispatch(setIsLoadingNotificationsAction(false));
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
