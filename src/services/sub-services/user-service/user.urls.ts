import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: () => `${apiUrl}/users`,
  currentUserUrl: () => `${apiUrl}/Users/current-user`,
};
