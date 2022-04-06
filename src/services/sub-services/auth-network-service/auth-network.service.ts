import ax, { AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import formUrlEncoded from 'form-urlencoded';

import userAuthUrls from '../user-auth-service/user-auth.urls';
import userAuthUtils from '../user-auth-service/user-auth.utils';
import {
  createAttachTokenInterceptor,
  createNetworkErrorHandlerInterceptor,
} from '../utils/interceptors';
import storageService from '../storage-service/storage.service';

const authNetworkService = ax.create({
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
});

if (__DEV__) {
  authNetworkService.interceptors.request.use(
    (requestConfig) => {
      const { method, url, data, headers } = requestConfig;
      console.log(`🤔 ${method?.toUpperCase()} ${url}`, { data, headers }); // eslint-disable-line no-console
      return requestConfig;
    },
    (error) => {
      console.log('❌', error); // eslint-disable-line no-console
      return Promise.reject(error);
    },
  );
  authNetworkService.interceptors.response.use(
    (response) => {
      const {
        data,
        headers,
        config: { url, method },
      } = response;
      console.log(`✅ ${method?.toUpperCase()} "${url}"`, { data, headers }); // eslint-disable-line no-console
      return response;
    },
    (error) => {
      console.log('❌', error); // eslint-disable-line no-console
      return Promise.reject(error);
    },
  );
}

const refreshConfig = {
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const refreshTokenLogic = () => {
  const _tryToRefreshToken = (refreshOAuthData: Object) => {
    const tokenUrl = userAuthUrls.tokenUrl();
    return ax.post(tokenUrl, formUrlEncoded(refreshOAuthData), refreshConfig);
  };

  const _storeNewTokens = (apiResponse: AxiosResponse<any>) =>
    userAuthUtils.storeAccessAndRefreshTokens(apiResponse);

  return Promise.resolve()
    .then(userAuthUtils.constructOAuthTokenRefreshData)
    .then(_tryToRefreshToken)
    .then(_storeNewTokens)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error.message);
    });
};

createAttachTokenInterceptor(authNetworkService, storageService.getAccessToken);
createAuthRefreshInterceptor(authNetworkService, refreshTokenLogic);
createNetworkErrorHandlerInterceptor(authNetworkService);

export default authNetworkService;
