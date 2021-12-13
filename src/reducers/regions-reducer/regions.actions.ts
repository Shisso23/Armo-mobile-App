import { setRegionsAction } from './regions.reducer';
import { flashService } from '../../services';
import { regionsService } from '../../services';
import _ from 'lodash';

export const getRegionsAction = () => async (dispatch: Function) => {
  try {
    const response: Array<string> = await regionsService.getRegions();
    dispatch(setRegionsAction(response));
    return response;
  } catch (error) {
    flashService.error(_.get(error, 'message', ''));
  }
};
