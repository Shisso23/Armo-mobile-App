import buildActionType from './action-type-creator';
import { Action } from './types';

function CreateAction(reducerName: string, actionName: string): Action {
  if (!reducerName || !actionName) {
    throw new Error('Please provide a valid reducer and action name');
  }
  const actionType = buildActionType(reducerName, actionName);
  return {
    actionType,
    action: (payload: any) => ({
      type: actionType,
      payload,
    }),
  };
}
// TODO: Fix any for payload type

export default CreateAction;
