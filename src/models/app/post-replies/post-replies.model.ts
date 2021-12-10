import _ from 'lodash';

const sortByDate = (comments: Array<{ createDate: string }>) => {
  return comments.sort(function (a: { createDate: string }, b: { createDate: string }) {
    var dateA = new Date(a.createDate),
      dateB = new Date(b.createDate);
    const sorted = dateA - dateB;
    return sorted;
  });
};

export const postReplyModel = (_model: Object) => ({
  content: _.get(_model, 'content', ''),
  createDate: _.get(_model, 'createDate', new Date()),
  downVotes: _.get(_model, 'downVotes', 0),
  upVotes: _.get(_model, 'upVotes', 0),
  id: _.get(_model, 'id', ''),
  ownerId: _.get(_model, 'ownerId', ''),
  replies: sortByDate(_.get(_model, 'replies', [])),
});

export const postCommentModel = (_model: Object) => ({
  content: _.get(_model, 'content', ''),
  createDate: _.get(_model, 'createDate', new Date()),
  downVotes: _.get(_model, 'downVotes', 0),
  upVotes: _.get(_model, 'upVotes', 0),
  id: _.get(_model, 'id', ''),
  ownerId: _.get(_model, 'ownerId', ''),
  replies: sortByDate(_.get(_model, 'replies', [])),
});

export const constructPostCommentsModels = (apiPostCommentsModel: Array<Object>) =>
  apiPostCommentsModel.map((comment: Object) => postCommentModel(comment));
