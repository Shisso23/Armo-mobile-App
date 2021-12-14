import _ from 'lodash';

import postCommentsUrls from './post-comments.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiReplyToPostModel, ReplyToPostProps } from '../../../models';
import flashService from '../flash-service/flash.service';
import { constructPostCommentsModels } from '../../../models/app/post-replies/post-replies.model';

const getPostComments = async (id: any) => {
  const url = postCommentsUrls.getPostComments(id);
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      return constructPostCommentsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching post comments!'));
    });
};

const createPostComment = async (formData: ReplyToPostProps, postId: any) => {
  const url = postCommentsUrls.createPostComment(postId);
  try {
    const apiResponse = await authNetworkService.post(url, apiReplyToPostModel(formData));
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while creating post comment!'));
  }
};

export default {
  getPostComments,
  createPostComment,
};
