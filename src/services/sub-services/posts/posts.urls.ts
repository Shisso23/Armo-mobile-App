import config from '../../../config';
const { apiUrl } = config;

export default {
  posts: () => `${apiUrl}/Posts`,
  categories: () => `${apiUrl}/Posts/categories`,
};
