import config from '../../../config';
const { apiUrl } = config;

export default {
  posts: () => `${apiUrl}/Posts`,
  categories: () => `${apiUrl}/Posts/categories`,
  subscribe: (postId: string) => `${apiUrl}/Posts/${postId}/subscribe`,
  unsubscribe: (postId: string) => `${apiUrl}/Posts/${postId}/unsubscribe`,
};
