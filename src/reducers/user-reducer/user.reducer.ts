import CreateAction from '../action-utilities/action-creator';
import { userModel } from '../../models';
import { UserReducer } from './types';
import { ActionObject } from '../action-utilities/types';

const reducerName = 'user';

const initialState: UserReducer = {
  user: userModel(),
};

const setUser = CreateAction(reducerName, 'SET_USER');
export const setUserAction = setUser.action;
export const setUserActionType = setUser.actionType;

export const userSelector = (reducers: any) => reducers.userReducer;

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
