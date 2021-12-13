import _ from 'lodash';

import regionsUrls from './regions.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';

const getRegions = async () => {
  const url = regionsUrls.getRegions();
  return authNetworkService
    .get(url)
    .then((apiResponse) => {
      return _.get(apiResponse, 'data.data', []);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching regions!'));
    });
};

export default {
  getRegions,
};
