import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Button } from 'react-native-elements';

import { emailSchema } from '../form-validaton-schemas';
import { getFormError } from '../form-utils';
import { flashService } from '../../../services';
import { SignUpProps } from '../../../models';
import CustomInput from '../../molecules/custom-input';
import DropdownSelect from '../../molecules/dropdown-select/dropdown-select';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type SignUpFormFormProps = {
  submitForm: Function;
  onSuccess?: Function;
  initialValues: SignUpProps;
};

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  name: Yup.string().required('Name is required'),
  surname: Yup.string().required('Surname is required'),
  email: emailSchema,
  region: Yup.string().required('Region is required'),
  company: Yup.string().required('Company is required'),
});

const regions = [
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

const RecruitmentForm: React.FC<SignUpFormFormProps> = ({
  submitForm,
  onSuccess = () => null,
  initialValues,
}) => {
  const { Gutters, Layout } = useTheme();
  const _handleSubmission = async (
    formData: SignUpFormFormProps,
    actions: FormikHelpers<SignUpProps>,
  ) => {
    try {
      await submitForm(formData);
      actions.setSubmitting(false);
      flashService.success('Signed up Successfully');
      onSuccess();
    } catch (error) {
      actions.setSubmitting(false);

      if (_.get(error, 'statusCode') === 422) {
        const apiErrors = error.errors;
        flashService.error('Form Submission Error');
        actions.resetForm({ values: formData, status: { apiErrors } });
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{ apiErrors: {} }}
      onSubmit={_handleSubmission}
      validationSchema={SignUpSchema}
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
            <CustomInput
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              label="Username"
              errorMessage={error('username')}
            />
            <CustomInput
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              label="Name"
              errorMessage={error('name')}
            />
            <CustomInput
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              label="Email"
              errorMessage={error('email')}
              keyboardType="email-address"
            />

            <DropdownSelect
              value={values.region}
              label="Region"
              keyExtractor={(region: any, index: Number) => `${region}${index}`}
              onChange={(region: any) => {
                console.log({ region });
                setFieldValue('region', region);
              }}
              items={regions}
              valueExtractor={(item: any) => {
                return item;
              }}
              error={error('region')}
              placeholder=""
              contentStyle={styles.regionContent}
            />
            <CustomInput
              value={values.company}
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              label="Company"
              errorMessage={error('company')}
            />
            <Button
              title="Submit"
              titleStyle={styles.buttonTitle}
              onPress={handleSubmit}
              loading={isSubmitting}
              containerStyle={[Layout.alignSelfCenter, styles.buttonContainer]}
              buttonStyle={styles.buttonStyle}
            />
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { borderRadius: 20, width: '70%' },
  buttonStyle: { backgroundColor: Colors.secondary, borderRadius: 20 },
  buttonTitle: { fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  regionContent: {
    borderColor: Colors.shadow,
    borderRadius: 20,
  },
});

export default RecruitmentForm;
