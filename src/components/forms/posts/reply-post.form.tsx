import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

import { ErrorObject } from '../types';
import { ReplyToPostProps } from '../../../models';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import DescriptionInput from '../../molecules/description-input';

type ReplyToFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: ReplyToPostProps;
};

const replyToPostSchema = Yup.object().shape({
  description: Yup.string().required(),
  imageUri: Yup.string(),
});

const ReplyToPostForm: React.FC<ReplyToFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const { Common, Gutters } = useTheme();
  const _handleSubmission = (
    formData: ReplyToPostProps,
    actions: FormikHelpers<ReplyToPostProps>,
  ) => {
    return submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success('Sent');
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
      validationSchema={replyToPostSchema}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, errors, isSubmitting, handleBlur, touched, status }) => {
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <DescriptionInput handleChange={handleChange} handleBlur={handleBlur} error={error} />

            <Button
              title="Post"
              icon={
                <Icon
                  name="send-o"
                  size={15}
                  color={Colors.white}
                  type="font-awesome"
                  style={Gutters.smallRMargin}
                />
              }
              onPress={handleSubmit}
              loading={isSubmitting}
              titleStyle={Common.submitButtonTitle}
              containerStyle={[Common.submitButtonContainer, styles.postButton]}
              buttonStyle={Common.submitButton}
              raised
            />
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  postButton: { width: '100%' },
});
export default ReplyToPostForm;
