import { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAttachTokenInterceptor = (axiosInstance: AxiosInstance, getAccessToken: Function) => {
  const _attachAccessToken = (config: AxiosRequestConfig) =>
    getAccessToken().then((accessToken: string) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

  return axiosInstance.interceptors.request.use(_attachAccessToken);
};
export default createAttachTokenInterceptor;
