import _ from 'lodash';

export type ForgotPasswordProps = {
  email: string;
};

export const forgotPasswordModel = (_model?: ForgotPasswordProps): ForgotPasswordProps => ({
  email: _.get(_model, 'email', ''),
});

export const apiForgotPasswordModel = (_model?: ForgotPasswordProps) => ({
  user: {
    email: _.get(_model, 'email', ''),
  },
});
