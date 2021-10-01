import _ from 'lodash';

export default class NetworkError extends Error {
  errors: any;
  statusCode: number;

  constructor(statusCode: number, error: any) {
    super(error);

    this.message = _.get(error, 'error');
    this.errors = _.get(error, 'errors');
    this.statusCode = statusCode;
  }
}
