import _ from 'lodash';

import notificationsUrls from './notifications.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';
import { constructNotificationsModels } from '../../../models/app/notifications/notifications.model';

const getNotifications = async () => {
  const url = notificationsUrls.getNotifications();
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      return constructNotificationsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching notifications!'));
    });
};

const getUnreadNotifications = async () => {
  const url = notificationsUrls.getUnreadNotifications();
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', []);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching unread notifications!'));
    });
};

const makeAsRead = async (notificationId: string) => {
  const url = notificationsUrls.markAsRead(notificationId);
  return authNetworkService
    .post(url)
    .then((apiResponse) => {
      return apiResponse;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error reading notification!'));
    });
};

const storeDeviceToken = async (deviceToken: string | null) => {
  const url = notificationsUrls.storeDeviceToken();
  return authNetworkService
    .post(url, {
      deviceToken,
    })
    .then((apiResponse) => {
      return apiResponse;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error setting device token'));
    });
};

export default {
  getNotifications,
  getUnreadNotifications,
  storeDeviceToken,
  makeAsRead,
};
