import _ from 'lodash';
import {
  ClientNetworkError,
  ServerNetworkError,
  ServerNotFoundError,
} from '../../../../exceptions';
import { AxiosError, AxiosInstance } from 'axios';

const createNetworkErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  const _serverResponded = (error: AxiosError) => error.response;
  const _noResponseFromServer = (error: AxiosError) => error.request;
  const _serverSideError = (statusCode: number) => statusCode >= 500;
  const _clientSideError = (statusCode: number) => statusCode >= 400;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      let exception;
      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');
        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_clientSideError(statusCode)) {
          exception = new ClientNetworkError(statusCode, error.response.data);
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerNotFoundError('Server is probably offline');
      } else {
        exception = new Error('Something terrible happened');
      }

      // eslint-disable-next-line no-console
      console.warn(exception);
      return Promise.reject(exception);
    },
  );
};
export default createNetworkErrorHandlerInterceptor;
