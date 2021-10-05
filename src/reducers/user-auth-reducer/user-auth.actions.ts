import { SignUpProps } from '../../models';
import { userAuthService } from '../../services';
import { setIsAuthenticatedAction, setIsLoadingAction } from './user-auth.reducer';

export const signUpAction: Function = (formData: SignUpProps) => async (dispatch: Function) => {
  dispatch(setIsLoadingAction(true));
  userAuthService.register(formData).finally(() => {
    dispatch(setIsLoadingAction(false));
  });
};

export const signOutAction: Function = () => (dispatch: Function) => {
  userAuthService.signOut().then(() => {
    dispatch(setIsAuthenticatedAction(false));
  });
};
