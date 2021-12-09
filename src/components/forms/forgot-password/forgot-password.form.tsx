import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

import { ErrorObject } from '../types';
import { ForgotPasswordProps } from '../../../models';
import CustomInput from '../../molecules/custom-input';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type ForgotPasswordFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: ForgotPasswordProps;
  _handleCancel: Function;
};

const forgotPasswordSchema = Yup.object().shape({
  email: emailSchema,
});

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
  _handleCancel,
}) => {
  const { Common, Gutters } = useTheme();
  const _handleSubmission = (
    formData: ForgotPasswordProps,
    actions: FormikHelpers<ForgotPasswordProps>,
  ) => {
    submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success(
          'Instructions to reset your password will be sent to your email address',
        );
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
      validationSchema={forgotPasswordSchema}
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
            <View style={styles.inputView}>
              <CustomInput
                value={values.email}
                onChangeText={handleChange('email')}
                autoCapitalize="none"
                onBlur={handleBlur('email')}
                label="Email"
                errorMessage={error('email')}
                leftIcon={
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={20}
                    iconStyle={[styles.icon, Common.android60PercentWhite]}
                  />
                }
                inputContainerStyle={Common.inputContainer}
                keyboardType="email-address"
              />
            </View>
            <Button
              title="Send"
              onPress={handleSubmit}
              loading={isSubmitting}
              titleStyle={Common.submitButtonTitle}
              containerStyle={Common.submitButtonContainer}
              buttonStyle={Common.submitButton}
            />

            <Button
              type="clear"
              title="Cancel"
              onPress={_handleCancel}
              titleStyle={styles.cancelButtonTitle}
              containerStyle={Gutters.smallTMargin}
            />
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  cancelButtonTitle: { color: Colors.gray },
  icon: { color: Colors.shadow, opacity: 0.5 },
  inputView: { width: '85%' },
});
export default ForgotPasswordForm;
