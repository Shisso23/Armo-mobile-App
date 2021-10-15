import config from '../../../config';
const { apiUrl } = config;

export default {
  upVoteComment: (commentId: string) => `${apiUrl}/Comments/${commentId}/upvote`,
  downVoteComment: (commentId: string) => `${apiUrl}/Comments/${commentId}/downvote`,
  createCommentReply: (commentId: string) => `${apiUrl}/Comments/${commentId}/reply`,
  deleteComment: (commentId: string) => `${apiUrl}/Comments/${commentId}`,
  editComment: (commentId: string) => `${apiUrl}/Comments/${commentId}`,
};
