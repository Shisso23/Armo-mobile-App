import _ from 'lodash';
import moment from 'moment';

const sortByDate = (comments: Array<{ createDate: string }>) => {
  comments = comments.sort((a: { createDate: string }, b: { createDate: string }) => {
    const date1 = moment(new Date(a.createDate)).format('YYYY-MM-DD:hh:mm:ss');
    const date2 = moment(new Date(b.createDate)).format('YYYY-MM-DD:hh:mm:ss');
    if (date1 > date2) {
      return -1;
    } else if (date2 > date1) {
      return 1;
    }
    return 0;
  });
  return comments;
};

export const postReplyModel = (_model: Object) => ({
  content: _.get(_model, 'content', ''),
  createDate: _.get(_model, 'createDate', new Date()),
  downVotes: _.get(_model, 'downVotes', 0),
  upVotes: _.get(_model, 'upVotes', 0),
  id: _.get(_model, 'id', ''),
  replies: sortByDate(_.get(_model, 'replies', [])),
  hasVoted: _.get(_model, 'hasVoted', false),
  upVoted: _.get(_model, 'upVoted', false), //TODO
  downVoted: _.get(_model, 'downVoted', false), //TODO
  owner: _.get(_model, 'owner', {}),
});

export const postCommentModel = (_model: Object) => ({
  content: _.get(_model, 'content', ''),
  createDate: _.get(_model, 'createDate', new Date()),
  downVotes: _.get(_model, 'downVotes', 0),
  upVotes: _.get(_model, 'upVotes', 0),
  id: _.get(_model, 'id', ''),
  ownerId: _.get(_model, 'ownerId', ''),
  replies: sortByDate(_.get(_model, 'replies', [])),
  hasVoted: _.get(_model, 'hasVoted', false),
  upVoted: _.get(_model, 'upVoted', false), //TODO
  downVoted: _.get(_model, 'downVoted', false), //TODO
  owner: _.get(_model, 'owner', {}),
});

export const constructPostCommentsModels = (apiPostCommentsModel: Array<{ createDate: string }>) =>
  sortByDate(apiPostCommentsModel).map((comment: Object) => postCommentModel(comment));
