import _ from 'lodash';

export type UserProps = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: Array<string>;
  strikeCount: number;
};

export type UserApiProps = {
  email: string;
  firstName: string;
  lastName: string;
};

export const userModel = (_model?: UserApiProps): UserProps => ({
  id: _.get(_model, 'id', ''),
  email: _.get(_model, 'email', ''),
  firstName: _.get(_model, 'firstName', ''),
  lastName: _.get(_model, 'lastName', ''),
  roles: _.get(_model, 'roles', ''),
  strikeCount: _.get(_model, 'strikeCount', ''),
});

export const apiUserModel = (_model?: UserApiProps) => ({
  user: {
    email: _.get(_model, 'email', ''),
    firstName: _.get(_model, 'firstName', ''),
    lastName: _.get(_model, 'lastName', ''),
  },
});
