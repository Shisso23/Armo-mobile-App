import _ from 'lodash';

import notificationsUrls from './notifications.urls';
// import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';
import { mockApi } from '../../../helpers/mock-api/mock-api';
import { constructNotificationsModels } from '../../../models/app/notifications/notifications.model';

const getNotifications = async () => {
  const url = notificationsUrls.getNotifications();
  return mockApi //TODO use authNetwork service once endpoints available
    .get(url)
    .then((apiResponse) => {
      return constructNotificationsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching notifications!'));
    });
};

export default {
  getNotifications,
};
