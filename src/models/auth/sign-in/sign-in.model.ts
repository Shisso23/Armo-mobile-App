import _ from 'lodash';

export type SignInProps = {
  username: string;
  password: string;
};

type SignInApiProps = {
  username: string;
  password: string;
};

export const signInModel = (_model?: SignInApiProps): SignInProps => ({
  username: _.get(_model, 'username', ''),
  password: _.get(_model, 'password', ''),
});

export const apiSignInModel = (_model?: SignInProps) => ({
  username: _.get(_model, 'username', ''),
  password: _.get(_model, 'password', ''),
});
