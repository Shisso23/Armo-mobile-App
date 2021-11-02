import { setAttachmentsAction, setIsLoadingGetAttchmentsAction } from './attachment.reducer';
import { attachementsService, flashService } from '../../services';

export const getAttchmentsAction =
  (postId: string, attachmentIds: Array<string>) => async (dispatch: Function) => {
    dispatch(setIsLoadingGetAttchmentsAction(true));
    try {
      const attachments = await Promise.all(
        attachmentIds.map(async (id: string) => {
          const attachment = await attachementsService.getAttachment(postId, id);
          return attachment;
        }),
      );
      dispatch(setAttachmentsAction(attachments));
      return attachments;
    } catch (error) {
      flashService.error(error.message);
    } finally {
      dispatch(setIsLoadingGetAttchmentsAction(false));
    }
  };
