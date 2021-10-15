import _ from 'lodash';

export type ReplyToPostProps = {
  description: string;
  imageUri: String;
};

export type EditCommentProps = {
  description: string;
};

export const editCommentModel = (_model?: EditCommentProps) => ({
  description: _.get(_model, 'description', ''),
});

export const ReplyToPostModel = (_model?: ReplyToPostProps): ReplyToPostProps => ({
  description: _.get(_model, 'description', ''),
  imageUri: _.get(_model, 'imageUri', ''),
});

export const apiReplyToPostModel = (_model?: ReplyToPostProps) => ({
  content: _.get(_model, 'description', ''),
});

export const apiEditCommentModel = (_model: EditCommentProps) => ({
  content: _.get(_model, 'description', ''),
});
