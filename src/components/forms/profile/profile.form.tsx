import React from 'react';
import { Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { ErrorObject } from '../types';
import { UserProps } from '../../../models';

type ProfileFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: UserProps;
};

const profileSchema = Yup.object().shape({
  email: emailSchema,
  name: Yup.string().required('Name is required'),
});

const ProfileForm: React.FC<ProfileFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleSubmission = (formData: UserProps, actions: FormikHelpers<UserProps>) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success('Successfully Updated Profile');
        onSuccess();
      })
      .catch((error: ErrorObject) => {
        actions.setSubmitting(false);
        if (_.get(error, 'statusCode') === 422) {
          const apiErrors = error.errors;
          flashService.error('Form Submission Error');
          actions.resetForm({ values: formData, status: { apiErrors } });
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={profileSchema}
      enableReinitialize
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        handleBlur,
        touched,
        status,
      }) => {
        const error = (name: string) => getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              label="Email"
              errorMessage={error('email')}
              keyboardType="email-address"
            />
            <Input
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              label="Name"
              errorMessage={error('name')}
            />
            <Button title="Update" onPress={handleSubmit} loading={isSubmitting} />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
