import _ from 'lodash';

export type RegisterProps = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
};

export type RegisterApiProps = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  terms_and_conditions: boolean;
};

export const registrationUserModel = (_model?: RegisterApiProps): RegisterProps => ({
  email: _.get(_model, 'email', ''),
  name: _.get(_model, 'name', ''),
  password: _.get(_model, 'password', ''),
  confirmPassword: _.get(_model, 'password_confirmation', ''),
  termsAndConditions: _.get(_model, 'terms_and_conditions', false),
});

export const apiRegistrationUserModel = (_model?: RegisterProps) => ({
  user: {
    email: _.get(_model, 'email', ''),
    name: _.get(_model, 'name', ''),
    password: _.get(_model, 'password', ''),
    password_confirmation: _.get(_model, 'confirmPassword', ''),
    terms_and_conditions: _.get(_model, 'termsAndConditions', false),
  },
});
