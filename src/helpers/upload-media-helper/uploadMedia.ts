import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';

const successfullySelectedImage = (res: any) => !res.didCancel;
const errorOccured = (res: any) => res.errorCode;

const constructFormData = (res = []) => {
  const response = [res].flat();
  return response.map((image) => {
    return {
      uri: _.get(image, 'path', ''),
      type: _.get(image, 'mime', ''),
      size: _.get(image, 'size', 0) / 1000,
    };
  });
};

const imageOptions = {
  mediaType: 'any',
  multiple: false,
  compressImageQuality: 0.5,
  width: 400,
  height: 400,
  cropping: true,
};

const genericLaunch = (launchFunction: Function) => {
  return new Promise((resolve, reject) => {
    launchFunction(imageOptions).then((res: any) => {
      if (successfullySelectedImage(res)) {
        resolve(constructFormData(res));
      } else if (errorOccured(res)) {
        reject();
      }
    });
  });
};

export const openUserGallery = () => {
  return genericLaunch(ImagePicker.openPicker);
};

export const openUserCamera = () => {
  return genericLaunch(ImagePicker.openCamera);
};
