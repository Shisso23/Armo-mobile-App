import _ from 'lodash';
import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  apiForgotPasswordModel,
  forgotPasswordModel,
  apiSignInModel,
  SignInProps,
  ForgotPasswordProps,
  apiSignUpModel,
  SignUpProps,
  signUpFormModel,
} from '../../../models';

const signIn = (formData: SignInProps) => {
  const signInUrl = authUrls.tokenUrl();
  const apiModel = apiSignInModel(formData);
  const oAuthData = authUtils.constructOAuthSignInData(apiModel);

  return networkService.post(signInUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const signOut = () => {
  return authUtils.removeAccessAndRefreshTokens();
};

const register = (formData: SignUpProps) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiSignUpModel(formData);
  console.log({ apiModel });

  return networkService.post(registerUrl, apiModel).catch((err) => {
    console.log({ err });
    err.errors = signUpFormModel(err.errors);
    return Promise.reject(err);
  });
};

const forgotPassword = async (formData: ForgotPasswordProps) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const apiModel = apiForgotPasswordModel(formData);

  return networkService.post(forgotPasswordUrl, apiModel).catch((err) => {
    err.errors = forgotPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

const doTokensExistInLocalStorage = () => {
  const _trueIfBothExist = (accessToken: string, refreshToken: string) =>
    !_.isNull(accessToken) && !_.isNull(refreshToken);

  return authUtils
    .getAccessAndRefreshTokens()
    .then(([accessToken, refreshToken]) => _trueIfBothExist(accessToken, refreshToken));
};

export default {
  signIn,
  signOut,
  register,
  forgotPassword,
  doTokensExistInLocalStorage,
};
