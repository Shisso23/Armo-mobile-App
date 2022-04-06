import _ from 'lodash';
import querystring from 'querystring';

import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  apiForgotPasswordModel,
  apiSignInModel,
  apiSignUpModel,
  forgotPasswordModel,
  ForgotPasswordProps,
  SignInProps,
  SignUpProps,
} from '../../../models';

const signIn = async (formData: SignInProps) => {
  const signInUrl = authUrls.tokenUrl();
  const apiModel = apiSignInModel(formData);
  const oAuthData = querystring.stringify(authUtils.constructOAuthSignInData(apiModel));
  return networkService
    .post(signInUrl, oAuthData, {
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => {
      return authUtils.storeAccessAndRefreshTokens(response);
    });
};

const signOut = () => {
  return authUtils.removeAccessAndRefreshTokens();
};

const register = async (formData: SignUpProps) => {
  const registerUrl = authUrls.registerUrl();
  const apiModel = apiSignUpModel(formData);
  try {
    return await networkService.post(registerUrl, apiModel);
  } catch (err) {
    return Promise.reject(err);
  }
};

const forgotPassword = async (formData: ForgotPasswordProps) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const apiModel = apiForgotPasswordModel(formData);

  return networkService.post(forgotPasswordUrl, apiModel).catch((err) => {
    err.errors = forgotPasswordModel(err.errors);
    return Promise.reject(err);
  });
};

const verifyEmail = async (formData: ForgotPasswordProps) => {
  const verifyEmailUrl = authUrls.verifyEmail();
  const apiModel = apiForgotPasswordModel(formData);

  return networkService.post(verifyEmailUrl, apiModel).catch((err) => {
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
  verifyEmail,
  doTokensExistInLocalStorage,
};
