import _ from 'lodash';

export type sponsorTypes = {
  id: string;
  company: string;
  region: string;
  contact: string;
  startDate: string;
  endDate: string;
  logoId: string;
  link: string;
  categories: Array<Object>;
  logo: string;
};

export type SponsorsProps = {
  items: Array<sponsorTypes>;
};

export const sponsorModel = (_model?: sponsorTypes) => ({
  id: _.get(_model, 'id', ''),
  company: _.get(_model, 'company', null),
  region: _.get(_model, 'region', null),
  contact: _.get(_model, 'contact', null),
  link: _.get(_model, 'link', null),
  startDate: _.get(_model, 'startDate', null),
  endDate: _.get(_model, 'endDate', null),
  logoId: _.get(_model, 'logoId', null),
  logo: _.get(_model, 'logo', null),
  categories: _.get(_model, 'categories', []),
});

export const constructSponsorsModels = (apiSponsorModel: Array<sponsorTypes>) =>
  apiSponsorModel.map((sponsor: sponsorTypes) => {
    return {
      ...sponsorModel(sponsor),
    };
  });
