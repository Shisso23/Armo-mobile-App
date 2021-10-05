import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: () => `${hostUrl}/connect/token`,
  registerUrl: () => `${apiUrl}/Accounts/sign-up`,
  verifyEmail: () => `${apiUrl}/Accounts/verify-email`,
  forgotPasswordUrl: () => `${apiUrl}/Accounts/forgot-password`,
};
