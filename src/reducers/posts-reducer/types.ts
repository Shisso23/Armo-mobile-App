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
};
