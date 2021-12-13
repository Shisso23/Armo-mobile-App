import config from '../../../config';
const { apiUrl } = config;

export default {
  getNotifications: () => `${apiUrl}/Notifications`,
  markAsRead: (id: string) => `${apiUrl}/Notifications/${id}/mark-as-read`,
};
