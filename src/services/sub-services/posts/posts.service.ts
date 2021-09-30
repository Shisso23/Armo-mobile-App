import _ from 'lodash';

import postUrls from './posts.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiCreatePostModel, apiEditPost, CreatePostProps, EditPostProps } from '../../../models';
import flashService from '../flash-service/flash.service';
import { objectToFormData } from '../../../helpers/object-to-form-data.helper.';

const getPosts = async (pageNumber = null, pageSize = null) => {
  const url = postUrls.posts();
  const params = pageNumber && pageSize ? `/PageNumber=${pageNumber}/PageSize=${pageSize}` : '';
  const apiResponse = await authNetworkService.get(`${url}${params}`);
  return _.get(apiResponse, 'data', null);
};

const getPost = async (id: any) => {
  const url = postUrls.posts();
  try {
    const apiResponse = await authNetworkService.get(`${url}/postId=${id}`);
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error fetching post!'));
  }
};

const createPost = async (formData: CreatePostProps) => {
  const url = postUrls.posts();
  const createPostModel = objectToFormData(apiCreatePostModel(formData), undefined);
  try {
    const apiResponse = await authNetworkService.post(url, createPostModel, {
      headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
    });
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Creating post!'));
  }
};

const editPost = async (formData: EditPostProps, postId: any) => {
  const url = postUrls.posts();
  const editPostModel = apiEditPost(formData);
  try {
    const apiResponse = await authNetworkService.put(`${url}/postId=${postId}`, editPostModel);
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Editing post!'));
  }
};

export default {
  getPosts,
  getPost,
  createPost,
  editPost,
};
