import ax from 'axios';
import { createNetworkErrorHandlerInterceptor } from '../utils/interceptors';

const axios = ax.create({
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  responseType: 'json',
});

if (__DEV__) {
  axios.interceptors.request.use(
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
  axios.interceptors.response.use(
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

createNetworkErrorHandlerInterceptor(axios);
export default axios;
