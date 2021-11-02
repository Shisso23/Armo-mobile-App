import _ from 'lodash';

export type AttachmentProps = {
  media: string;
};

export const apiAttachmentModel = (_model?: AttachmentProps) => ({
  file: _.get(_model, 'media', ''),
});
