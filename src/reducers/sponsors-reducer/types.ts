export type sponsorsTypesState = {
  sponsors: Array<{
    id: any;
    name: string | String;
    description: string | String;
    images: {
      uri: string;
    };
  }>;
  isLoadingSponsors: boolean;
};
