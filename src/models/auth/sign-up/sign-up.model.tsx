import _ from 'lodash';

export type SignUpProps = {
  username: string;
  name: string;
  email: string;
  region: string;
  company: string;
  password: string;
  confirmPassword: string;
};

export type ApiSignUpProps = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  company: string;
  password: string;
  confirmPassword: string;
};

export const signUpFormModel = (_model?: SignUpProps) => ({
  username: _.get(_model, 'username', ''),
  name: _.get(_model, 'name', ''),
  email: _.get(_model, 'email', ''),
  region: _.get(_model, 'region', ''),
  company: _.get(_model, 'company', ''),
  confirmPassword: _.get(_model, 'confirmPassword', ''),
  password: _.get(_model, 'password', ''),
});

export const apiSignUpModel = (_model?: SignUpProps) => ({
  username: _.get(_model, 'username', ''),
  email: _.get(_model, 'email', ''),
  region: _.get(_model, 'region', ''),
  company: _.get(_model, 'company', ''),
  confirmPassword: _.get(_model, 'confirmPassword', ''),
  password: _.get(_model, 'password', ''),
  lastName: _.get(_model, 'lastName', ''),
  firstName: _.get(_model, 'name', ''),
});
