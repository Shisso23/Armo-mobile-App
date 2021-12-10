import appConfig from '../../../config';

const { apiUrl } = appConfig;

export default {
  userUrl: () => `${apiUrl}/users`,
  currentUserUrl: () => `${apiUrl}/user`,
  users: () => `${apiUrl}/BackOffice/Users`, //TODO use APP get users when error fixed
};
