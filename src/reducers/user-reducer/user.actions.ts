import { setUserAction } from './user.reducer';
import { userService } from '../../services';

export const getUserAction: Function = () => (dispatch: Function) => {
  userService.getUser().then((_user) => {
    dispatch(setUserAction(_user));
  });
};
