import _ from 'lodash';

export type SignInProps = {
  email: string;
  password: string;
};

type SignInApiProps = {
  email: string;
  password: string;
};

export const signInModel = (_model?: SignInApiProps): SignInProps => ({
  email: _.get(_model, 'email', ''),
  password: _.get(_model, 'password', ''),
});

export const apiSignInModel = (_model?: SignInProps) => ({
  email: _.get(_model, 'email', ''),
  password: _.get(_model, 'password', ''),
});
