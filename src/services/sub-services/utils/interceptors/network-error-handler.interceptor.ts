import _ from 'lodash';
import { AxiosError, AxiosInstance } from 'axios';

import {
  ClientNetworkError,
  ServerNetworkError,
  ServerNotFoundError,
} from '../../../../exceptions';
import { userAuthService } from '../../..';
import store from '../../../../reducers/store';
import { setIsAuthenticatedAction } from '../../../../reducers/user-auth-reducer/user-auth.reducer';

const createNetworkErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  const _serverResponded = (error: AxiosError) => error.response;
  const _noResponseFromServer = (error: AxiosError) => error.request;
  const _serverSideError = (statusCode: number) => statusCode >= 500;
  const _clientSideError = (statusCode: number) => statusCode >= 400;
  const _authError = (statusCode: number) => statusCode === 401;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let exception;
      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');
        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_clientSideError(statusCode)) {
          if (_authError(statusCode)) {
            userAuthService.signOut().then(() => {
              store.dispatch(setIsAuthenticatedAction(false));
            });
          } else {
            exception = new ClientNetworkError(statusCode, error.response.data);
          }
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerNotFoundError('Server is probably offline');
      } else {
        exception = new Error('Something terrible happened');
      }
      return Promise.reject(exception);
    },
  );
};
export default createNetworkErrorHandlerInterceptor;
