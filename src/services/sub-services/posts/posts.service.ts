import _ from 'lodash';

import postUrls from './posts.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import {
  apiCreatePostModel,
  apiEditPostModel,
  CreatePostProps,
  EditPostProps,
  postCategoriesModel,
} from '../../../models';
import flashService from '../flash-service/flash.service';
import { objectToFormData } from '../../../helpers/object-to-form-data.helper.';

export type getPostsTypes = {
  keyword?: string | null;
  ascendingOrder?: boolean | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  categories?: Array<string> | null;
};

const getPosts = async (params?: getPostsTypes) => {
  const url = postUrls.posts();
  const apiResponse = await authNetworkService.get(
    url,
    params && {
      params: {
        'Filter.Search': params.keyword,
        'Filter.Ascending': params.ascendingOrder,
        PageNumber: params.pageNumber,
        PageSize: params.pageSize,
        'Filter.Categories': params.categories,
      },
    },
  );

  return _.get(apiResponse, 'data.data', null);
};

const getPost = async (id: any) => {
  const url = postUrls.posts();

  return authNetworkService
    .get(`${url}/${id}`)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', null);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching post!'));
    });
};

const createPost = async (formData: CreatePostProps) => {
  const url = postUrls.posts();
  const createPostModel = objectToFormData(apiCreatePostModel(formData), 'Media');
  try {
    const apiResponse = await authNetworkService.post(url, createPostModel, {
      headers: { Accept: 'multipart/form-data', 'content-type': 'multipart/form-data' },
    });
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Creating post!'));
  }
};

const editPost = async (formData: EditPostProps, postId: any) => {
  const url = postUrls.posts();
  const editPostModel = apiEditPostModel(formData);
  try {
    const apiResponse = await authNetworkService.put(`${url}/${postId}`, editPostModel);
    return _.get(apiResponse, 'data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error Editing post!'));
  }
};

const deletePost = async (id: any) => {
  const url = postUrls.posts();
  return authNetworkService
    .delete(`${url}/${id}`)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', null);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error deleting post!'));
    });
};

const getCategories = async () => {
  const url = postUrls.categories();
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      const categories = postCategoriesModel(_.get(apiResponse, 'data.data', null));
      return categories;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching categories!'));
    });
};

const subscribe = async (postId: string) => {
  const url = postUrls.subscribe(postId);
  return authNetworkService
    .post(url, { postId })
    .then((apiResponse) => {
      return apiResponse;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error while subscribing to post!'));
    });
};

const unsubscribe = async (postId: string) => {
  const url = postUrls.unsubscribe(postId);
  return authNetworkService
    .post(url, { postId })
    .then((apiResponse) => {
      return apiResponse;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error while unsubscribing to post!'));
    });
};

export default {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
  getCategories,
  subscribe,
  unsubscribe,
};
