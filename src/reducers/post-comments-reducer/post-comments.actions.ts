import { setIsLoadingGetPostCommentsAction, setPostCommentsAction } from './post-comments.reducer';
import { flashService, postCommentsService } from '../../services';
import { ReplyToPostProps } from '../../models';

export const getPostCommentsAction = async (id: any) => async (dispatch: Function) => {
  dispatch(setIsLoadingGetPostCommentsAction(true));
  try {
    const response = await postCommentsService.getPostComments(id);
    dispatch(setPostCommentsAction(response));
    return response;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingGetPostCommentsAction(false));
  }
};

export const createPostCommentAction = async (formData: ReplyToPostProps, postId: any) => {
  try {
    await postCommentsService.createPostComment(formData, postId);
  } catch (error) {
    flashService.error(error.message);
  }
};
