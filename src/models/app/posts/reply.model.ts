import _ from 'lodash';

export type ReplyToPostProps = {
  description: string;
  imageUri: String;
};

export const ReplyToPostModel = (_model?: ReplyToPostProps): ReplyToPostProps => ({
  description: _.get(_model, 'description', ''),
  imageUri: _.get(_model, 'imageUri', ''),
});

export const apiReplyToPostModel = (_model?: ReplyToPostProps) => ({
  content: _.get(_model, 'description', ''),
});
