import _ from 'lodash';

export type UserProps = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: Array<string>;
  strikeCount: number;
  region: string;
  company: string;
  engagementScore: number;
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
  region: _.get(_model, 'region', ''),
  company: _.get(_model, 'company', ''),
  engagementScore: _.get(_model, 'engagementScore', 0),
});

export const apiUserModel = (_model?: UserApiProps) => ({
  user: {
    email: _.get(_model, 'email', ''),
    firstName: _.get(_model, 'firstName', ''),
    lastName: _.get(_model, 'lastName', ''),
  },
});
