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
  title: string;
  content: string;
};

export type apiPostProps = {
  id: any;
  title: string;
  content: string;
  owner: { id: string; fullName: string };
  category: string;
  attachments: Array<string>;
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
  id: _.get(_model, 'id', ''),
  title: _.get(_model, 'title', ''),
  content: _.get(_model, 'content', ''),
  owner: _.get(_model, 'owner', {}),
  category: _.get(_model, 'category', ''),
  attachments: _.get(_model, 'attachments', ''),
});

export const apiGetPosts = (_model: GetPostProps) => ({
  PageNumber: _.get(_model, 'pageNumber', null),
  PageSize: _.get(_model, 'pageSize', null),
});

export const editPost = (_model: EditPostProps) => ({
  title: _.get(_model, 'pageNumber', null),
  PageSize: _.get(_model, 'pageSize', null),
});

export const apiEditPost = (_model: EditPostProps) => ({
  PageNumber: _.get(_model, 'topicTitle', null),
  PageSize: _.get(_model, 'description', null),
});

export const constructPostsModels = (apiPostsModel: postsTypesState) =>
  apiPostsModel.map((post: apiPostProps) => apiPost(post));
