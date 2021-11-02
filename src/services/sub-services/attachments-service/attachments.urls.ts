import config from '../../../config';
const { apiUrl } = config;

export default {
  getAttachment: (postId: string, attachmentId: string) =>
    `${apiUrl}/Posts/${postId}/attachment/${attachmentId}`,
  deleteAttachment: (postId: string, attachmentId: string) =>
    `${apiUrl}/Posts/${postId}/attachment/${attachmentId}`,
  postAttachment: (postId: string) => `${apiUrl}/Posts/${postId}/attachment`,
};
