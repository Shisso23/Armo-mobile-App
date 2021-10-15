import _ from 'lodash';

import sponsorsUrls from './sponsors.urls';
// import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';
import { mockApi } from '../../../helpers/mock-api/mock-api';
import { constructSponsorsModels } from '../../../models/app/sponsors/sponsors.model';

const getSponsors = async () => {
  const url = sponsorsUrls.getSponsors();
  return mockApi //TODO use authNetwork service once endpoints available
    .get(url)
    .then((apiResponse) => {
      return constructSponsorsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching sponsors!'));
    });
};

export default {
  getSponsors,
};
