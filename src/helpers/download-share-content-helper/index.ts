import _ from 'lodash';
import { Alert } from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { flashService } from '../../services';
const { config, fs } = RNFetchBlob;
const dirToSave = fs.dirs.DocumentDir;

export const shareContent = ({
  filename,
  content,
  url,
  headers,
}: {
  filename: string;
  content: string;
  url: string;
  headers: any;
}) => {
  config({
    fileCache: true,
    path: `${dirToSave}/armo-${filename}.jpg`,
  })
    .fetch('GET', url, headers)
    .then(async (resp) => {
      const { status } = resp.info();

      if (status !== 200) {
        const jsonResult = await resp.json();
        const message = _.get(jsonResult, 'message');
        flashService.error(`Error while sharing content: ${message}`);
      }
      Share.open({
        title: `Post image ${filename}`,
        message: content,
        url: `file:///${resp.path()}`,
        subject: `Armo/${filename}`,
        failOnCancel: false,
        showAppsToView: true,
      });
    })
    .catch((error) => {
      Alert.alert('Oh No!', error.message);
    });
};
