import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import postsReducer from '../reducers/posts-reducer/posts.reducer';
import postCommentsReducer from './post-comments-reducer/post-comments.reducer';
import commentRepliesReducer from './comment-replies-reducer/comment-replies.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  postsReducer,
  postCommentsReducer,
  commentRepliesReducer,
});
