import _ from 'lodash';

export type SignUpProps = {
  username: string;
  name: string;
  surname: string;
  email: string;
  region: string;
  company: string;
};

export const signUpFormModel = (_model = {}) => ({
  username: _.get(_model, 'username', ''),
  name: _.get(_model, 'name', ''),
  surname: _.get(_model, 'surname', ''),
  email: _.get(_model, 'email', ''),
  region: _.get(_model, 'region', ''),
  company: _.get(_model, 'company', ''),
});
