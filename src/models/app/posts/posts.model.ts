import _ from 'lodash';

export type CreatePostProps = {
  category: string;
  topicTitle: string;
  description: string;
  imageUri: String;
};

export const CreatePostModel = (_model?: CreatePostProps): CreatePostProps => ({
  category: _.get(_model, 'category', ''),
  topicTitle: _.get(_model, 'topicTitle', ''),
  description: _.get(_model, 'description', ''),
  imageUri: _.get(_model, 'imageUri', ''),
});

export const apiCreatePostModel = (_model?: CreatePostProps) => ({
  category: _.get(_model, 'category', ''),
  topic_title: _.get(_model, 'topicTitle', ''),
  description: _.get(_model, 'description', ''),
  imageUri: _.get(_model, 'imageUri', ''),
});
