import _ from 'lodash';

import sponsorsUrls from './sponsors.urls';
import flashService from '../flash-service/flash.service';
import { constructSponsorsModels } from '../../../models/app/sponsors/sponsors.model';
import { authNetworkService } from '../..';

export type fetchPromosTypes = {
  keyword?: string | null;
  sortBy?: string | null;
  PageNumber?: number | null;
  PageSize?: number | null;
};

const getSponsors = async (params?: fetchPromosTypes) => {
  const url = sponsorsUrls.promostions();
  return authNetworkService
    .get(
      url,
      params && {
        params: {
          'Filter.Search': params.keyword,
          'Filter.SortBy': params.sortBy,
          PageNumber: params.PageNumber,
          PageSize: params.PageSize,
        },
      },
    )
    .then((apiResponse) => {
      return constructSponsorsModels(_.get(apiResponse, 'data.data', []));
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching promos!'));
    });
};

export default {
  getSponsors,
};
