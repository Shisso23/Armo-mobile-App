import { UserProps } from '../../models';

export type UserReducer = {
  user: UserProps;
  users: Array<UserProps>;
};
