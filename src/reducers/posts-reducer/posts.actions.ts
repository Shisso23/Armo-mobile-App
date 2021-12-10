import {
  setIsLoadingEditPostAction,
  setIsLoadingGetPostAction,
  setIsLoadingGetPostsAction,
  setIsLoadingDeletePostAction,
  setPostsAction,
  setCategoriesAction,
  setIsLoadingCategoriesAction,
  setIsLoadingSubscribeToPostAction,
  setIsLoadingUnsubscribeToPostAction,
  setIsLoadingReportUserAction,
  setMyPostsAction,
  setIsLoadingGetMyPostsAction,
  setIsLoadingGetSubscribedPostsAction,
  setSubscribedPostsAction,
} from './posts.reducer';
import { flashService } from '../../services';
import { postsService } from '../../services';
import { constructPostsModels, CreatePostProps, EditPostProps } from '../../models';
import reportUserService, {
  reportUserTypes,
} from '../../services/sub-services/report-user-service/report-user.service';
import { getPostsTypes } from '../../services/sub-services/posts/posts.service';
import _ from 'lodash';

export const getPostsAction = async (params?: getPostsTypes) => async (dispatch: Function) => {
  dispatch(setIsLoadingGetPostsAction(true));
  try {
    const response = await postsService.getPosts(params);
    dispatch(setPostsAction(constructPostsModels(response.items)));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  } finally {
    dispatch(setIsLoadingGetPostsAction(false));
  }
};

export const getMyPostsAction = async (params?: getPostsTypes) => async (dispatch: Function) => {
  dispatch(setIsLoadingGetMyPostsAction(true));
  try {
    const response = await postsService.getMyPosts(params);
    dispatch(setMyPostsAction(constructPostsModels(response.items)));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  } finally {
    dispatch(setIsLoadingGetMyPostsAction(false));
  }
};

export const getSubscribedPostsAction =
  async (params?: getPostsTypes) => async (dispatch: Function) => {
    dispatch(setIsLoadingGetSubscribedPostsAction(true));
    try {
      const response = await postsService.getSubscribedPosts(params);
      dispatch(setSubscribedPostsAction(constructPostsModels(response.items)));
      return response;
    } catch (error) {
      flashService.error(_.get(error, 'message', ''));
    } finally {
      dispatch(setIsLoadingGetSubscribedPostsAction(false));
    }
  };

export const getPostAction = async (id: any) => (dispatch: Function) => {
  dispatch(setIsLoadingGetPostAction(true));

  return postsService
    .getPost(id)
    .then((post) => {
      return post;
    })
    .catch((error) => {
      flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setIsLoadingGetPostAction(false));
    });
};

export const editPostAction =
  async (formData: EditPostProps, id: any) => async (dispatch: Function) => {
    dispatch(setIsLoadingEditPostAction(true));
    try {
      let post = await postsService.editPost(formData, id);
      return post;
    } catch (error) {
      flashService.error(_.get(error, 'message', ''));
    } finally {
      dispatch(setIsLoadingEditPostAction(false));
    }
  };

export const createPostAction = async (formData: CreatePostProps) => {
  try {
    await postsService.createPost(formData);
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  }
};

export const deletePostAction = async (id: any) => (dispatch: Function) => {
  dispatch(setIsLoadingDeletePostAction(true));

  return postsService
    .deletePost(id)
    .then((post) => {
      return post;
    })
    .catch((error) => {
      flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setIsLoadingDeletePostAction(false));
    });
};

export const getCategoriesAction = async () => (dispatch: Function) => {
  dispatch(setIsLoadingCategoriesAction(true));

  return postsService
    .getCategories()
    .then((categories) => {
      dispatch(setCategoriesAction(categories));
      return categories;
    })
    .catch((error) => {
      flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setIsLoadingCategoriesAction(false));
    });
};

export const subscribeToPostAction = async (postId: string) => (dispatch: Function) => {
  dispatch(setIsLoadingSubscribeToPostAction(true));
  return postsService
    .subscribe(postId)
    .then(async (subscribed) => {
      dispatch(setIsLoadingGetPostsAction(true));
      await dispatch(getPostsAction());
      return subscribed;
    })
    .catch((error) => {
      flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setIsLoadingGetPostsAction(false));
      dispatch(setIsLoadingSubscribeToPostAction(false));
    });
};

export const unsubscribeToPostAction = async (postId: string) => (dispatch: Function) => {
  dispatch(setIsLoadingUnsubscribeToPostAction(true));
  return postsService
    .unsubscribe(postId)
    .then(async (unsubscribed) => {
      dispatch(setIsLoadingGetPostsAction(true));
      await dispatch(getPostsAction());
      return unsubscribed;
    })
    .catch((error) => {
      flashService.error(error.message);
    })
    .finally(() => {
      dispatch(setIsLoadingGetPostsAction(false));
      dispatch(setIsLoadingUnsubscribeToPostAction(false));
    });
};

export const reportUserAction = async (formData: reportUserTypes) => async (dispatch: Function) => {
  dispatch(setIsLoadingReportUserAction(true));
  return await reportUserService.reportUser(formData).finally(() => {
    dispatch(setIsLoadingReportUserAction(false));
  });
};
