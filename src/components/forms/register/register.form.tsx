import React from 'react';
import { Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import {
  emailSchema,
  registerPasswordSchema,
  confirmPasswordSchema,
  termsAndConditionsSchema,
} from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { TermsAndConditions } from '../../molecules';
import { flashService } from '../../../services';

import { ErrorObject } from '../types';
import { RegisterProps } from '../../../models';

type RegisterFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: RegisterProps;
};

const registerSchema = Yup.object().shape({
  email: emailSchema,
  name: Yup.string().required('Name is required'),
  password: registerPasswordSchema,
  confirmPassword: confirmPasswordSchema,
  termsAndConditions: termsAndConditionsSchema,
});

const RegisterForm: React.FC<RegisterFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const _handleSubmission = (formData: RegisterProps, actions: FormikHelpers<RegisterProps>) => {
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
      validationSchema={registerSchema}
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
        setFieldValue,
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
            <Input
              value={values.password}
              onChangeText={handleChange('password')}
              label="Password"
              secureTextEntry
              onBlur={handleBlur('password')}
              errorMessage={error('password')}
            />
            <Input
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              label="Confirm Password"
              secureTextEntry
              onBlur={handleBlur('confirmPassword')}
              errorMessage={error('confirmPassword')}
            />
            <Button title="Register" onPress={handleSubmit} loading={isSubmitting} />
            <TermsAndConditions
              checked={values.termsAndConditions}
              onPress={() => setFieldValue('termsAndConditions', !values.termsAndConditions)}
            />
            {__DEV__ && <Text>{JSON.stringify(values, null, 2)}</Text>}
          </>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
