import { setRegionsAction } from './regions.reducer';
import { regionsService } from '../../services';
import _ from 'lodash';

export const getRegionsAction = () => async (dispatch: Function) => {
  try {
    const response: Array<string> = await regionsService.getRegions();
    dispatch(setRegionsAction(response));
    return response;
  } catch (error) {
    console.warn(_.get(error, 'message', 'Could not fetch regions'));
  }
};
