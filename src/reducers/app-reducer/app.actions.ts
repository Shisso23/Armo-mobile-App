import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from '../user-auth-reducer/user-auth.reducer';

export const initAppAction: Function = () => async (dispatch: Function) => {
  const { doTokensExistInLocalStorage } = userAuthService;
  await dispatch(loadAppDataAction());
  const tokensExist = await doTokensExistInLocalStorage();
  if (tokensExist) {
    await dispatch(isAuthenticatedFlowAction());
  }
  // hide splash
};

export const isAuthenticatedFlowAction: Function = () => (dispatch: Function) =>
  Promise.all([dispatch(loadAppDataForSignedInUserAction())]).finally(() => {
    dispatch(setIsAuthenticatedAction(true));
  });

export const loadAppDataAction: Function = () => () => Promise.all([]);

export const loadAppDataForSignedInUserAction: Function = () => () => Promise.all([]);
