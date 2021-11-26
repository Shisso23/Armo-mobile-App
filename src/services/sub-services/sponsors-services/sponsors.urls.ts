import config from '../../../config';
const { apiUrl } = config;

export default {
  promostions: () => `${apiUrl}/BackOffice/Promotions`, //TODO use App promotions
};
