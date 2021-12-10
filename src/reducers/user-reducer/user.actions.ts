import { setUserAction, setUsersAction } from './user.reducer';
import { userService } from '../../services';

export const getUserAction: Function = () => (dispatch: Function) => {
  userService.getUser().then((_user) => {
    dispatch(setUserAction(_user));
  });
};

export const getUsersAction: Function = () => (dispatch: Function) => {
  userService.getUsers().then((_users) => {
    dispatch(setUsersAction(_users));
  });
};
