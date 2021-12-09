import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import postsReducer from '../reducers/posts-reducer/posts.reducer';
import postCommentsReducer from './post-comments-reducer/post-comments.reducer';
import commentRepliesReducer from './comment-replies-reducer/comment-replies.reducer';
import notificationsReducer from './notifications-reducer/notifications.reducer';
import sponsorsReducer from './sponsors-reducer/sponsors.reducer';
import attachmentsReducer from './attachments-reducer/attachment.reducer';
import regionsReducer from './regions-reducer/regions.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  postsReducer,
  postCommentsReducer,
  commentRepliesReducer,
  notificationsReducer,
  sponsorsReducer,
  attachmentsReducer,
  regionsReducer,
});
