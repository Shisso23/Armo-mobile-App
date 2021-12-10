import { SponsorsProps } from '../../models/app/sponsors/sponsors.model';

export type sponsorsTypesState = {
  sponsors: Array<SponsorsProps>;
  isLoadingSponsors: boolean;
};
