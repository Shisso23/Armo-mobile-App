import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { passwordSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

import { ErrorObject } from '../types';
import { ResetPasswordProps } from '../../../models';
import CustomInput from '../../molecules/custom-input';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type ResetPasswordFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: ResetPasswordProps;
};

const resetPasswordSchema = Yup.object().shape({
  password: passwordSchema,
  reTyped: Yup.string().required('Password is required'),
});

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const { Common, Gutters, Layout } = useTheme();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isRetypedPasswordHidden, setIsRetypedPasswordHidden] = useState(true);
  const [passwordsMatched, setPasswordMatched] = useState(true);
  const _handleSubmission = (
    formData: ResetPasswordProps,
    actions: FormikHelpers<ResetPasswordProps>,
  ) => {
    if (!passwordsMatched) {
      return null;
    }
    return submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success('Password resetted');
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

  const validateConfirmPassword = (password: String, value: String) => {
    if (password && value) {
      if (password.substr(0, value.length) !== value || password.length !== value.length) {
        return setPasswordMatched(false);
      }
      return setPasswordMatched(true);
    }
    return setPasswordMatched(false);
  };

  const _showPasswordShort = (type: String) => {
    setTimeout(() => {
      if (type === 'confirm') {
        setIsRetypedPasswordHidden(true);
      } else {
        setIsPasswordHidden(true);
      }
    }, 3000);
    if (type === 'confirm') {
      setIsRetypedPasswordHidden(false);
    } else {
      setIsPasswordHidden(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={resetPasswordSchema}
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
        setFieldError,
      }) => {
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <View style={[styles.inputView]}>
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
                    onPress={() => _showPasswordShort('password')}
                    color={Colors.gray}
                  />
                }
              />

              <CustomInput
                value={values.reTyped}
                secureTextEntry={isRetypedPasswordHidden}
                onChangeText={(text) => {
                  validateConfirmPassword(values.password, text);
                  setFieldValue('reTyped', text);
                }}
                autoCapitalize="none"
                onBlur={handleBlur('reTyped')}
                label="Re-Type Password"
                errorMessage={(!passwordsMatched && 'Did not match password') || ''}
                onEndEditing={() => {
                  !passwordsMatched && setFieldError('reTyped', 'Did not match password');
                }}
                inputContainerStyle={Common.inputContainer}
                rightIcon={
                  <Icon
                    type="material-community"
                    size={21}
                    name={isRetypedPasswordHidden ? 'eye' : 'eye-off'}
                    onPress={() => _showPasswordShort('confirm')}
                    style={styles.icon}
                  />
                }
              />
            </View>

            <View style={[styles.buttonsView, Layout.alignSelfCenter, Layout.alignItemsCenter]}>
              <Button
                title="Submit"
                onPress={handleSubmit}
                loading={isSubmitting}
                titleStyle={Common.submitButtonTitle}
                containerStyle={Common.submitButtonContainer}
                buttonStyle={Common.submitButton}
              />

              <Button
                type="clear"
                title="Cancel"
                onPress={() => {}}
                titleStyle={styles.cancelButtonTitle}
                containerStyle={Gutters.smallTMargin}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonsView: { bottom: 50, position: 'absolute', width: '100%' },
  cancelButtonTitle: { color: Colors.gray },
  icon: { color: Colors.shadow, opacity: 0.5 },
  inputView: { marginTop: '25%', width: '85%' },
});
export default ResetPasswordForm;
