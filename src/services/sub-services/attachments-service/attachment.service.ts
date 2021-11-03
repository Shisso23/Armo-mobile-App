import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';

import attachmentsUrls from './attachments.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import { apiAttachmentModel, AttachmentProps } from '../../../models';
import flashService from '../flash-service/flash.service';
import { objectToFormData } from '../../../helpers/object-to-form-data.helper.';
import storageService from '../../../services/sub-services/storage-service/storage.service';

const { config, fs } = RNFetchBlob;
const dirToSave = fs.dirs.DocumentDir;

const getAttachment = async (postId: string, attachmentId: string) => {
  const url = attachmentsUrls.getAttachment(postId, attachmentId);
  const token = await storageService.getAccessToken();
  return config({ path: `${dirToSave}/armo-${attachmentId}.jpg`, fileCache: true })
    .fetch('GET', url, {
      Authorization: `Bearer ${token}`,
    })
    .then((response) => {
      return `file:///${response.path()}`;
    });
};

const createAttachment = async (formData: AttachmentProps, postId: any) => {
  const url = attachmentsUrls.postAttachment(postId);
  const postAttachmentModel = objectToFormData(apiAttachmentModel(formData), 'file');
  try {
    const apiResponse = await authNetworkService.post(url, postAttachmentModel, {
      headers: { Accept: 'multipart/form-data', 'content-type': 'multipart/form-data' },
    });
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error creating attachment!'));
  }
};

const deleteAttachment = async (postId: string, attachmentId: string) => {
  const url = attachmentsUrls.deleteAttachment(postId, attachmentId);
  try {
    const apiResponse = await authNetworkService.delete(url);
    return _.get(apiResponse, 'data.data', null);
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error deleting attachment!'));
  }
};

export default {
  getAttachment,
  createAttachment,
  deleteAttachment,
};
