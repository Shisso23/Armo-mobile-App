import { setIsLoadingsponsorsAction, setsponsorsAction } from './sponsors.reducer';
import { flashService } from '../../services';
import { sponsorsService } from '../../services';
import { SponsorsProps } from '../../models/app/sponsors/sponsors.model';

export const getSponsorsAction = async () => async (dispatch: Function) => {
  dispatch(setIsLoadingsponsorsAction(true));
  try {
    const response: Array<SponsorsProps> | any = await sponsorsService.getSponsors();

    dispatch(setsponsorsAction(response));
    return response;
  } catch (error) {
    flashService.error(error.message);
  } finally {
    dispatch(setIsLoadingsponsorsAction(false));
  }
};
