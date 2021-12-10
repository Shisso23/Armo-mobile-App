import _ from 'lodash';

import urls from './report-user.urls';
import authNetworkService from '../auth-network-service/auth-network.service';
import flashService from '../flash-service/flash.service';

export type reportUserTypes = {
  postId: string | null;
  commentId: string | null;
  reason: string;
};

const reportUser = async (formData: reportUserTypes) => {
  const url = urls.reportUser();
  try {
    const apiResponse = await authNetworkService.post(url, formData);
    if (apiResponse.status === 200 || apiResponse.status === 204) {
      flashService.success('Successfully reported!');
    } else {
      flashService.error('Could not report post');
    }
    return apiResponse;
  } catch (error) {
    flashService.error(_.get(error, 'message', 'Error while reporting user post!'));
  }
};

export default {
  reportUser,
};
