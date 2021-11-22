import _ from 'lodash';

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
  CategoryId: _.get(_model, 'category.id'),
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

export const postCategoriesModel = (_model: Array<{ id: string; name: string }>) => {
  let categoriesArray: { id: string; name: string }[] = [];
  Object.keys(_model).map((catId) => {
    categoriesArray.push({ id: catId, name: _.get(_model, `${catId}`, '') });
  });
  return categoriesArray;
};

export const editPostModel = (_model = {}) => ({
  topicTitle: _.get(_model, 'topicTitle', ''),
  description: _.get(_model, 'description', ''),
});

export const apiEditPostModel = (_model: EditPostProps) => ({
  title: _.get(_model, 'topicTitle', ''),
  content: _.get(_model, 'description', ''),
});

export const constructPostsModels = (apiPostsModel: Array<apiPostProps>) =>
  apiPostsModel.map((post: apiPostProps) => apiPost(post));
