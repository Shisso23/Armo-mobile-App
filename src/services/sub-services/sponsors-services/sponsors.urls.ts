import config from '../../../config';
const { apiUrl } = config;

export default {
  promostions: () => `${apiUrl}/Promotions`,
  fetchLogo: (logoId: string) => `${apiUrl}/Promotions/${logoId}`,
};
