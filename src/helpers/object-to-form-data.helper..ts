import _ from 'lodash';
import { Platform } from 'react-native';

export const objectToFormData = (obj: any, mediaPropertyKey: string) => {
  const formData = new FormData();

  if (obj) {
    _.forEach(Object.keys(obj), (formKey) => {
      if (formKey === mediaPropertyKey) {
        _.forEach(obj[formKey], (image) => {
          formData.append(mediaPropertyKey, {
            name: image.uri.substring(image.uri.lastIndexOf('/') + 1),
            type: image.type,
            uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
          });
        });
      } else {
        formData.append(formKey, obj[formKey]);
      }
    });
  }

  return formData;
};
