import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { getFormError } from '../form-utils';
import { flashService } from '../../../services';

import { ErrorObject } from '../types';
import { CreatePostProps } from '../../../models';
import CustomInput from '../../molecules/custom-input';
import DropdownSelect from '../../molecules/dropdown-select/dropdown-select';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import DescriptionInput from '../../molecules/description-input';
import ImageThumbnail from '../../molecules/image-thumbnail';

type ResetPasswordFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: CreatePostProps;
};

const createPostSchema = Yup.object().shape({
  category: Yup.string().required(),
  topicTitle: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array(),
});

const categories = [
  'AFR',
  'ARM',
  'ARM-CE',
  'ARMA',
  'ARMSA',
  'ANIPAC',
  'BPF',
  'IT-RO',
  'Nordic ARM',
  'ROTOPOL',
  'RPC-CPPIA',
  'StAR',
];

const CreatePostForm: React.FC<ResetPasswordFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const { Common, Gutters, Layout } = useTheme();
  const _handleSubmission = (
    formData: CreatePostProps,
    actions: FormikHelpers<CreatePostProps>,
  ) => {
    return submitForm(formData)
      .then(() => {
        actions.setSubmitting(false);
        flashService.success('Post created successfully');
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
      validationSchema={createPostSchema}
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
        const error = (name: string): string | undefined =>
          getFormError(name, { touched, status, errors });
        return (
          <>
            <DropdownSelect
              value={values.category}
              label="Category"
              keyExtractor={(category: any, index: Number) => `${category}${index}`}
              onChange={(category: any) => {
                setFieldValue('category', category);
              }}
              items={categories}
              valueExtractor={(item: any) => {
                return item;
              }}
              error={error('category')}
              placeholder=""
              contentStyle={styles.categoryContent}
              inputContainerStyle={styles.inputContainer}
              rightIcon={
                <Icon
                  type="material-community"
                  size={21}
                  name="chevron-right"
                  style={styles.icon}
                />
              }
            />

            <CustomInput
              value={values.topicTitle}
              onChangeText={handleChange('topicTitle')}
              onBlur={handleBlur('topicTitle')}
              label="Topic title"
              errorMessage={error('topicTitle')}
              inputContainerStyle={styles.inputContainer}
              leftIcon={undefined}
            />
            <DescriptionInput
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.description}
              error={error}
            />
            <ImageThumbnail image={_.get(values, 'image', {})} />

            <View style={[styles.buttonsView, Layout.alignSelfCenter, Layout.alignItemsCenter]}>
              <Button
                type="outline"
                title="Upload Image/Video"
                icon={
                  <Icon
                    name="upload"
                    color={Colors.gray}
                    size={17}
                    type="antdesign"
                    style={Gutters.smallRMargin}
                  />
                }
                onPress={() => {}}
                titleStyle={styles.uploadButtonTitle}
                buttonStyle={styles.uploadButtonStyle}
                containerStyle={[
                  Gutters.regularBMargin,
                  Common.submitButtonContainer,
                  styles.uploadButtonContainer,
                ]}
                raised
              />
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
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonsView: { bottom: 50, position: 'absolute', width: '100%' },
  categoryContent: {
    borderColor: Colors.shadow,
    borderRadius: 20,
  },
  icon: { color: Colors.shadow, opacity: 0.8 },
  inputContainer: {
    borderBottomWidth: 0,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  postButton: { width: '100%' },
  uploadButtonContainer: {
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    borderWidth: 0.8,
    width: '100%',
  },
  uploadButtonStyle: { borderRadius: 20, borderWidth: 0 },
  uploadButtonTitle: { color: Colors.black, opacity: 0.6 },
});
export default CreatePostForm;
