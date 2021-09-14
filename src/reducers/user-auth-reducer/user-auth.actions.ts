import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from './user-auth.reducer';

export const signOutAction: Function = () => (dispatch: Function) => {
  userAuthService.signOut().then(() => {
    dispatch(setIsAuthenticatedAction(false));
  });
};
