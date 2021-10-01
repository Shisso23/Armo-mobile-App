import { UserAuthReducer } from './user-auth-reducer/types';
import { UserReducer } from './user-reducer/types';

export type RootReducer = {
  userAuthReducer: UserAuthReducer;
  userReducer: UserReducer;
};
