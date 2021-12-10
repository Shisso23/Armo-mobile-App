import _ from 'lodash';

export type sponsorTypes = {
  id: string;
  company: string;
  region: string;
  contact: string;
  startDate: string;
  endDate: string;
  logoId: string;
};

export type SponsorsProps = {
  items: Array<sponsorTypes>;
  hasNextPage: boolean;
  pageIndex: number;
  totalPages: number;
};

export const sponsorModel = (_model?: sponsorTypes) => ({
  id: _.get(_model, 'id', ''),
  company: _.get(_model, 'company', null),
  region: _.get(_model, 'region', null),
  contact: _.get(_model, 'contact', null),
  startDate: _.get(_model, 'startDate', null),
  endDate: _.get(_model, 'endDate', null),
  logoId: _.get(_model, 'logoId', null),
});

export const constructSponsorsModels = (apiSponsorModel: SponsorsProps) =>
  apiSponsorModel.items.map((sponsor: sponsorTypes) => {
    return {
      ...sponsorModel(sponsor),
      hasNextPage: _.get(apiSponsorModel, 'hasNextPage', null),
      pageIndex: _.get(apiSponsorModel, 'pageIndex', null),
      totalPages: _.get(apiSponsorModel, 'totalPages', null),
    };
  });
