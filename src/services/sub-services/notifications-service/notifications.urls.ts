import config from '../../../config';
const { apiUrl } = config;

export default {
  getNotifications: () => `${apiUrl}/Notifications`,
  getUnreadNotifications: () => `${apiUrl}/Notifications/unread`,
  markAsRead: (id: string) => `${apiUrl}/Notifications/${id}/mark-as-read`,
  storeDeviceToken: () => `${apiUrl}/Accounts/store-device-token`,
};
