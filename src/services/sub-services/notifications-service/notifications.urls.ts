import config from '../../../config';
const { apiUrl } = config;

export default {
  getNotifications: () => `${apiUrl}/notifications`,
};
