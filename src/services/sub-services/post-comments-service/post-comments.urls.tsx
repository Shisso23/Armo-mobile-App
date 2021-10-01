import config from '../../../config';
const { apiUrl } = config;

export default {
  getPostComments: (postId: string) => `${apiUrl}/Posts/${postId}/comments`,
  createPostComment: (postId: string) => `${apiUrl}/Posts/${postId}/comment`,
};
