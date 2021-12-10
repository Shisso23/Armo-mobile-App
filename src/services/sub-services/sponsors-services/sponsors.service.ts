import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';

import sponsorsUrls from './sponsors.urls';
import flashService from '../flash-service/flash.service';
import { constructSponsorsModels, sponsorTypes } from '../../../models/app/sponsors/sponsors.model';
import { authNetworkService } from '../..';
import storageService from '../storage-service/storage.service';

export type fetchPromosTypes = {
  keyword?: string | null;
  sortBy?: string | null;
  PageNumber?: number | null;
  PageSize?: number | null;
  CategoryId?: string | null;
};

const { config, fs } = RNFetchBlob;
const dirToSave = fs.dirs.DocumentDir;

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
          CategoryId: params.CategoryId,
        },
      },
    )
    .then(async (apiResponse) => {
      const responseWithLogo: Array<sponsorTypes> = await Promise.all(
        _.get(apiResponse, 'data.data', []).map(async (sponsor: sponsorTypes) => {
          const logo = await getLogo(sponsor.logoId);
          return { ...sponsor, logo };
        }),
      );
      return constructSponsorsModels(responseWithLogo);
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching promos!'));
    });
};

const getLogo = async (logoId: string) => {
  const url = sponsorsUrls.fetchLogo(logoId);
  const token = await storageService.getAccessToken();
  return config({ path: `${dirToSave}/armo-${logoId}.png`, fileCache: true })
    .fetch('GET', url, {
      Authorization: `Bearer ${token}`,
    })
    .then((response) => {
      return `file:///${response.path()}`;
    })
    .catch((error) => {
      flashService.error(_.get(error, 'message', 'Error fetching company logo!'));
    });
};

export default {
  getSponsors,
};
