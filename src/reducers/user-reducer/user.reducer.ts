import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';
import { UserReducer } from './types';
import { ActionObject } from '../action-utilities/types';

const reducerName = 'user';

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;
export const setUserActionType = setUser.actionType;

const initialState: UserReducer = {
  user: userModel(),
};

export default function userReducer(state = initialState, action: ActionObject) {
  switch (action.type) {
    case setUser.actionType:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
