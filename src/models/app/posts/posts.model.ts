import _ from 'lodash';
import { postsTypesState } from '../../../reducers/posts-reducer/types';

export type CreatePostProps = {
  category: string;
  topicTitle: string;
  description: string;
  media: Array<any>;
};

export type GetPostProps = {
  pageNumber: number;
  pageSize: number;
};

export type EditPostProps = {
  topicTitle: string;
  description: string;
};

export type apiPostProps = {
  title: string;
  summary: string;
  id: any;
};

export const CreatePostModel = (_model?: CreatePostProps): CreatePostProps => ({
  category: _.get(_model, 'category', ''),
  topicTitle: _.get(_model, 'topicTitle', ''),
  description: _.get(_model, 'description', ''),
  media: _.get(_model, 'media', []),
});

export const apiCreatePostModel = (_model?: CreatePostProps) => ({
  CategoryId: _.get(_model, 'category', ''),
  Title: _.get(_model, 'topicTitle', ''),
  Content: _.get(_model, 'description', ''),
  Media: _.get(_model, 'media', []),
});

export const apiPost = (_model: apiPostProps) => ({
  title: _.get(_model, 'title', ''),
  summary: _.get(_model, 'summary', ''),
  id: _.get(_model, 'id', ''),
});

export const apiGetPosts = (_model: GetPostProps) => ({
  PageNumber: _.get(_model, 'pageNumber', null),
  PageSize: _.get(_model, 'pageSize', null),
});

export const editPostModel = (_model = {}) => ({
  topicTitle: _.get(_model, 'topicTitle', ''),
  description: _.get(_model, 'description', ''),
});

export const apiEditPostModel = (_model: EditPostProps) => ({
  title: _.get(_model, 'topicTitle', ''),
  content: _.get(_model, 'description', ''),
});

export const constructPostsModels = (apiPostsModel: postsTypesState) =>
  apiPostsModel.map((post: apiPostProps) => apiPost(post));
