export const objectToFormData = (obj: any, form: any) => {
  const fieldsToExcludeFromRecursion = [
    'photo',
    'photoUri',
    'profile_picture',
    'photo_uri',
    'Media',
  ];
  const formData = form || new FormData();
  let formKey;

  if (obj) {
    Object.keys(obj).forEach((name) => {
      formKey = name;

      if (typeof obj[name] === 'object' && !fieldsToExcludeFromRecursion.includes(name)) {
        objectToFormData(obj[name], formData);
      } else {
        formData.append(formKey, obj[name]);
      }
    });
  }

  return formData;
};
