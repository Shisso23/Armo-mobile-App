import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import appConfig from '../../config';

const { apiUrl } = appConfig;

const NOTIFICATIONS = [
  {
    id: 0,
    title: 'first',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    sent_at: new Date(),
    seen: false,
  },
  {
    id: 1,
    title: 'second',
    message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem ',
    sent_at: new Date(),
    seen: true,
  },
  {
    id: 2,
    title: 'third',
    message: 'I have got a great news for you!',
    sent_at: new Date(),
    seen: false,
  },
];

// mock midleware while we do not have a backend.
export const mockApi = axios.create({
  withCredentials: false,
  timeout: 20000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});
const mockAdapter = new MockAdapter(mockApi, { delayResponse: 400 });

// mocking getNotification api
mockAdapter.onGet(`${apiUrl}/notifications`).reply(() => {
  const response = 200;
  const data = {
    data: NOTIFICATIONS,
  };

  return [response, data];
});
