import CreateAction from '../action-utilities/action-creator';
import { UserAuthReducer } from './types';
import { ActionObject } from '../action-utilities/types';

const reducerName = 'user-auth';

const setIsAuthenticated = CreateAction(reducerName, 'SET_IS_AUTHENTICATED');
export const setIsAuthenticatedAction = setIsAuthenticated.action;

const setIsLoading = CreateAction(reducerName, 'SET_IS_LOADING');
export const setIsLoadingAction = setIsLoading.action;

const initialState: UserAuthReducer = {
  isAuthenticated: false,
  isLoading: false,
};

export default function userAuthReducer(state = initialState, action: ActionObject) {
  switch (action.type) {
    case setIsAuthenticated.actionType:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}
