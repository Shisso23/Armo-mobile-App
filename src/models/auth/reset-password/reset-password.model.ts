import _ from 'lodash';

export type ResetPasswordProps = {
  password: string;
  reTyped: string;
};

export const resetPasswordModel = (_model?: ResetPasswordProps): ResetPasswordProps => ({
  password: _.get(_model, 'password', ''),
  reTyped: _.get(_model, 'reTyped', ''),
});

export const apiResetPasswordModel = (_model?: ResetPasswordProps) => ({
  user: {
    password: _.get(_model, 'password', ''),
  },
});
