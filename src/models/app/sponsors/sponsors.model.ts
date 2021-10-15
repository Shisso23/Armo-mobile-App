import _ from 'lodash';

export type SponsorsProps = {
  id: any;
  description: String;
  name: String;
  images: Array<{ uri: string }>;
};

export const sponsorModel = (_model?: SponsorsProps) => ({
  id: _.get(_model, 'id', ''),
  name: _.get(_model, 'name', ''),
  description: _.get(_model, 'description', ''),
  images: _.get(_model, 'images', null),
});

export const constructSponsorsModels = (apiSponsorModel: SponsorsProps[]) =>
  apiSponsorModel.map((notification: SponsorsProps) => sponsorModel(notification));
