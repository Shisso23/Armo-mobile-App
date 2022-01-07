import RNBootSplash from 'react-native-bootsplash';

import { userAuthService } from '../../services';
import { setIsAuthenticatedAction } from '../user-auth-reducer/user-auth.reducer';
import { getUserAction } from '../user-reducer/user.actions';

export const initAppAction: Function = () => async (dispatch: Function) => {
  const { doTokensExistInLocalStorage } = userAuthService;
  await dispatch(loadAppDataAction());
  const tokensExist = await doTokensExistInLocalStorage();
  if (tokensExist) {
    await dispatch(isAuthenticatedFlowAction());
  }
  setTimeout(() => {
    RNBootSplash.hide({ fade: true });
  }, 1500); // force process to run a bit later.
  // ensures that the login screen is not shown when the user is authenticated.
};

export const isAuthenticatedFlowAction: Function = () => (dispatch: Function) =>
  Promise.all([dispatch(loadAppDataForSignedInUserAction())]).finally(() => {
    dispatch(setIsAuthenticatedAction(true));
  });

export const loadAppDataAction: Function = () => () => Promise.all([]);

export const loadAppDataForSignedInUserAction: Function = () => (dispatch: Function) =>
  Promise.all([dispatch(getUserAction())]);
