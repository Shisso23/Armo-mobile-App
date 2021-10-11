import _ from 'lodash';

import commentsUrls from './comment-replies.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiEditCommentModel,
  apiReplyToPostModel,
  EditCommentProps,
  ReplyToPostProps,
} from '../../../models';
import flashService from '../flash-service/flash.service';

const createCommentReply = async (formData: ReplyToPostProps, postId: any) => {
  const url = commentsUrls.createCommentReply(postId);
  try {
    const apiResponse = await authNetworkService.post(url, apiReplyToPostModel(formData));
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while replying to comment!'));
  }
};
const upVoteComment = async (commentId: string) => {
  const url = commentsUrls.upVoteComment(commentId);
  try {
    const apiResponse = await authNetworkService.post(url);
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while up voting comment!'));
  }
};

const downVoteComment = async (commentId: string) => {
  const url = commentsUrls.downVoteComment(commentId);
  try {
    const apiResponse = await authNetworkService.post(url);
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while down voting comment!'));
  }
};

const deleteComment = async (commentId: string) => {
  const url = commentsUrls.deleteComment(commentId);
  try {
    const apiResponse = await authNetworkService.delete(url);
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while deleting comment!'));
  }
};

const editComment = async (formData: EditCommentProps, id: any) => {
  const url = commentsUrls.editComment(id);
  const editCommentModel = apiEditCommentModel(formData);
  try {
    const apiResponse = await authNetworkService.put(`${url}`, editCommentModel);
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Editing comment!'));
  }
};

export default {
  createCommentReply,
  deleteComment,
  downVoteComment,
  upVoteComment,
  editComment,
};
