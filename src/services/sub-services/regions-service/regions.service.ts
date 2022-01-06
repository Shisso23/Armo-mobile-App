import _ from 'lodash';

import regionsUrls from './regions.urls';
import authNetworkService from '../auth-network-service/auth-network.service';

const getRegions = async () => {
  const url = regionsUrls.getRegions();
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', []);
    })
    .catch((error) => {
      console.warn(_.get(error, 'message', 'Could not fetch regions'));
    });
};

export default {
  getRegions,
};
