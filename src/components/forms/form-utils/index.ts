import { getIn } from 'formik';
import _ from 'lodash';

export const getFormError = (
  name: string,
  { touched, errors, status }: { touched: Object; errors: Object; status: Object },
): string | undefined => {
  const fieldTouched = getIn(touched, name);
  const backendError = getIn(status, ['apiErrors', name]);
  const clientError = getIn(errors, name);
  if (clientError && fieldTouched) {
    return clientError;
  }
  if (backendError && !fieldTouched) {
    return _.join(backendError, ', ');
  }
  return undefined;
};
