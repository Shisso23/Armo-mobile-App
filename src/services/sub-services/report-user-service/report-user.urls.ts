import config from '../../../config';
const { apiUrl } = config;

export default {
  reportUser: () => `${apiUrl}/Users/report-user`,
};
