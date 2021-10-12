import { setIsLoadingNotificationsAction, setNotificationsAction } from './notifications.reducer';
import { flashService } from '../../services';
import { notificationsService } from '../../services';

export const getNotificationsAction = () => async (dispatch: Function) => {
  dispatch(setIsLoadingNotificationsAction(true));
  try {
    const response = await notificationsService.getNotifications();
    dispatch(setNotificationsAction(response));
    return response;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingNotificationsAction(false));
  }
};
