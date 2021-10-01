import _ from 'lodash';

export type UserProps = {
  email: string;
  name: string;
};

export type UserApiProps = {
  email: string;
  name: string;
};

export const userModel = (_model?: UserApiProps): UserProps => ({
  email: _.get(_model, 'email', ''),
  name: _.get(_model, 'name', ''),
});

export const apiUserModel = (_model?: UserApiProps) => ({
  user: {
    email: _.get(_model, 'email', ''),
    name: _.get(_model, 'name', ''),
  },
});
