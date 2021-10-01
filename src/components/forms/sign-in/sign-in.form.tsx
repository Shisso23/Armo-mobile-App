import React from 'react';
import { Button, Input } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { emailSchema, passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';

import { ErrorObject } from '../types';
import { SignInProps } from '../../../models';

type SignInFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: SignInProps;
};

const signInSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

const SignInForm: React.FC<SignInFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleFormSubmitError = (
    error: ErrorObject,
    actions: FormikHelpers<SignInProps>,
    formData: SignInProps,
  ) => {
    actions.setSubmitting(false);
    if (_.get(error, 'statusCode') === 422) {
      const apiErrors = error.errors;
      actions.resetForm({ values: formData, status: { apiErrors } });
    } else if (error.statusCode === 400) {
      actions.setFieldError('email', 'Incorrect login credentials provided');
    } else {
      actions.setFieldError('email', error.message);
    }
  };

  const _handleSubmission = (formData: SignInProps, actions: FormikHelpers<SignInProps>) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        onSuccess();
      })
      .catch((error: ErrorObject) => _handleFormSubmitError(error, actions, formData));
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={signInSchema}
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
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <Input
              value={values.email}
              onChangeText={handleChange('email')}
              label="Email"
              onBlur={handleBlur('email')}
              errorMessage={error('email')}
              keyboardType="email-address"
            />
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              label="Password"
              onBlur={handleBlur('password')}
              secureTextEntry
              errorMessage={error('password')}
            />
            <Button title="Login" onPress={handleSubmit} loading={isSubmitting} />
          </>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
