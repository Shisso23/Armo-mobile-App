import { SignUpProps } from '../../models';
import { flashService, userAuthService } from '../../services';
import { setIsAuthenticatedAction, setIsLoadingAction } from './user-auth.reducer';

export const signUpAction: Function =
  async (formData: SignUpProps) => async (dispatch: Function) => {
    try {
      dispatch(setIsLoadingAction(true));
      const response = await userAuthService.register(formData);
      return response;
    } catch (error) {
      flashService.error(error.message);
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

export const signOutAction: Function = () => (dispatch: Function) => {
  userAuthService.signOut().then(() => {
    dispatch(setIsAuthenticatedAction(false));
  });
};
