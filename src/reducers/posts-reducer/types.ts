export type postsTypesState = {
  posts: Array<{
    items: Array<any>;
    pageIndex: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }>;
  isLoadingGetPosts: boolean;
  isLoadingGetPost: boolean;
  isLoadingEditPost: boolean;
  isLoadingDeletePost: boolean;
  categories: Array<any>;
  isLoadingCategories: boolean;
  isLoadingSubscribeToPost: boolean;
  isLoadingUnsubscribeToPost: boolean;
  isLoadingReportUser: boolean;
  myPosts: Array<{
    items: Array<any>;
    pageIndex: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }>;
  isLoadingGetMyPosts: boolean;
  subscribedPosts: Array<{
    items: Array<any>;
    pageIndex: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }>;
  isLoadingGetSubscribedPosts: boolean;
};
