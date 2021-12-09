import config from '../../../config';
const { apiUrl } = config;

export default {
  getRegions: () => `${apiUrl}/Accounts/regions`,
};
