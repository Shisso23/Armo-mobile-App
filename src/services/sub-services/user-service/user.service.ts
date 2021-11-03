import { AxiosResponse } from 'axios';

import authNetworkService from '../auth-network-service/auth-network.service';
import { userModel, apiUserModel, UserProps } from '../../../models';
import userUrls from './user.urls';
import { mockApi } from '../../../helpers/mock-api/mock-api';

const getUser = () => {
  const url = userUrls.currentUserUrl();
  const _createAndReturnUserModel = (apiResponse: AxiosResponse): UserProps =>
    userModel(apiResponse.data);

  return mockApi
    .get(url)
    .then((response) => {
      return _createAndReturnUserModel(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return Promise.reject(error);
    });
};

const updateUser = (formData: UserProps) => {
  const url = userUrls.userUrl();
  const apiUser = apiUserModel(formData);

  return authNetworkService.patch(url, apiUser).catch((error) => {
    error.errors = userModel(error.errors);
    // eslint-disable-next-line no-console
    console.warn(error);
    return Promise.reject(error);
  });
};

export default {
  getUser,
  updateUser,
};
