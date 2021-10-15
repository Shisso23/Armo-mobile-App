import config from '../../../config';
const { apiUrl } = config;

export default {
  getSponsors: () => `${apiUrl}/sponsors`,
};
