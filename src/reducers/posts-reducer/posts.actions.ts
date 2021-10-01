import {
  setIsLoadingEditPostAction,
  setIsLoadingGetPostAction,
  setIsLoadingGetPostsAction,
  setIsLoadingDeletePostAction,
  setPostsAction,
} from './posts.reducer';
import { flashService } from '../../services';
import { postsService } from '../../services';
import { constructPostsModels, CreatePostProps, EditPostProps } from '../../models';

export const getPostsAction =
  (pageNumber = null, pageSize = null) =>
  async (dispatch: Function) => {
    dispatch(setIsLoadingGetPostsAction(true));
    try {
      const response = await postsService.getPosts(pageNumber, pageSize);
      dispatch(setPostsAction(constructPostsModels(response.items)));
      return response;
    } catch (error) {
      flashService.error(error.message);
    } finally {
      dispatch(setIsLoadingGetPostsAction(false));
    }
  };

export const getPostAction = (id: any) => (dispatch: Function) => {
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

export const editPostAction = (formData: EditPostProps, id: any) => async (dispatch: Function) => {
  dispatch(setIsLoadingEditPostAction(true));
  try {
    let post = await postsService.editPost(formData, id);
    return post;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingEditPostAction(false));
  }
};

export const createPostAction = async (formData: CreatePostProps) => {
  try {
    await postsService.createPost(formData);
  } catch (error) {
    flashService.error(error.message);
  }
};

export const deletePostAction = (id: any) => (dispatch: Function) => {
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
