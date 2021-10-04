import { setIsLoadingDeleteCommentAction } from './comment-replies.reducer';
import { flashService } from '../../services';
import { commentsService } from '../../services';

export const deleteCommentAction = (postId: string) => async (dispatch: Function) => {
  try {
    const response = await commentsService.deleteComment(postId);
    dispatch(setIsLoadingDeleteCommentAction(true));
    return response;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingDeleteCommentAction(false));
  }
};
