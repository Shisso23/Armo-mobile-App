import { combineReducers } from 'redux';

import userAuthReducer from './user-auth-reducer/user-auth.reducer';
import userReducer from './user-reducer/user.reducer';
import postsReducer from '../reducers/posts-reducer/posts.reducer';

export default combineReducers({
  userAuthReducer,
  userReducer,
  postsReducer,
});
