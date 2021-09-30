import {
  setIsLoadingEditPostAction,
  setIsLoadingGetPostAction,
  setIsLoadingGetPostsAction,
  setPostsAction,
} from './posts.reducer';
import { flashService } from '../../services';
import { postsService } from '../../services';
import { CreatePostProps, EditPostProps } from '../../models';

export const getPostsAction = (pageNumber: any, pageSize: any) => async (dispatch: Function) => {
  dispatch(setIsLoadingGetPostsAction(true));
  try {
    const posts = await postsService.getPosts(pageNumber, pageSize);
    dispatch(setPostsAction(posts));
    return posts;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingGetPostsAction(false));
  }
};

export const getPostAction = (id: any) => async (dispatch: Function) => {
  dispatch(setIsLoadingGetPostAction(true));
  try {
    let post = await postsService.getPost(id);
    return post;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingGetPostAction(false));
  }
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
