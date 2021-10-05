import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/connect/token`,
  registerUrl: () => `${apiUrl}/Accounts/sign-up`,
  forgotPasswordUrl: () => `${apiUrl}/users/password`,
};
