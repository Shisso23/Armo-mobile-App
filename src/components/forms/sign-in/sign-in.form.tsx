import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';

import { ErrorObject } from '../types';
import CustomInput from '../../molecules/custom-input';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { SignInProps } from '../../../models';
import { ForgotPasswordLink } from '../../molecules';

type SignInFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: SignInProps;
};

const signInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: passwordSchema,
});

const SignInForm: React.FC<SignInFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { Common, Layout, Gutters } = useTheme();
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
      actions.setFieldError('username', 'Incorrect login credentials provided');
    } else {
      actions.setFieldError('username', error.message);
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

  const _showPasswordShort = () => {
    setTimeout(() => {
      setIsPasswordHidden(true);
    }, 3000);

    setIsPasswordHidden(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={signInSchema}
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
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <View style={[styles.inputView]}>
              <CustomInput
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                label="Username"
                errorMessage={error('username')}
                leftIcon={
                  <Icon name="user" type="font-awesome" size={20} iconStyle={styles.icon} />
                }
                inputContainerStyle={Common.inputContainer}
              />
              <CustomInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                label="Password"
                errorMessage={error('password')}
                inputContainerStyle={Common.inputContainer}
                autoCapitalize="none"
                secureTextEntry={isPasswordHidden}
                rightIcon={
                  <Icon
                    type="material-community"
                    size={21}
                    name={isPasswordHidden ? 'eye' : 'eye-off'}
                    onPress={() => _showPasswordShort()}
                    style={styles.icon}
                  />
                }
              />
            </View>

            <View style={[styles.buttonsView, Layout.alignSelfCenter, Layout.alignItemsCenter]}>
              <Button
                title="SIGN IN"
                onPress={handleSubmit}
                loading={isSubmitting}
                titleStyle={Common.submitButtonTitle}
                containerStyle={Common.submitButtonContainer}
                buttonStyle={Common.submitButton}
              />
              <ForgotPasswordLink containerStyle={Gutters.regularVMargin} />
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonsView: { width: '100%' },
  icon: { color: Colors.shadow, opacity: 0.5 },
  inputView: { marginTop: '25%', width: '85%' },
});

export default SignInForm;
