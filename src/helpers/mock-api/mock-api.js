import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import appConfig from '../../config';

const { apiUrl } = appConfig;
const user = {
  id: 'c14d0a18-cba4-42b0-9fe6-6eacf363c9e6',
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@codehesion.co.za',
  roles: ['Administrator'],
  strikeCount: 0,
};

const NOTIFICATIONS = [
  {
    id: 0,
    title: 'first',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    createDate: new Date(),
    markedAsRead: false,
  },
  {
    id: 1,
    title: 'second',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem ',
    createDate: new Date(),
    markedAsRead: true,
  },
  {
    id: 2,
    title: 'third',
    content: 'I have got a great news for you!',
    createDate: new Date(),
    markedAsRead: false,
  },
];

const SPONSORS = [
  {
    id: 0,
    company: 'Suppliers',
    region: 'Lorem ipsum',
    contact: 'hyacinthe.ebula21@gmail.com',
    logoId: 23434,
    logo: '../../assets/images/sponsor.png',
    link: 'www.google.com',
    startDate: new Date(),
    endDate: new Date(),
    categories: [
      { name: 'Graphics', id: 5 },
      { name: 'Drilling', id: 6 },
    ],
  },
  {
    id: 1,
    company: 'Moreleta',
    region: 'Lorem ipsum',
    contact: 'hyacinthe.ebula21@gmail.com',
    link: 'www.google.com',
    logoId: 23334,
    logo: 'file://../assets/images/sponsor2.png',
    startDate: new Date(),
    endDate: new Date(),
    categories: [
      { name: 'Trimming', id: 3 },
      { name: 'Graphics', id: 4 },
    ],
  },

  {
    id: 2,
    company: 'Menlyn',
    region: 'Lorem ipsum',
    contact: 'hyacinthe.ebula21@gmail.com',
    link: 'www.google.com',
    logoId: 26734,
    logo: 'file:///../../assets/images/sponsor3.png',
    startDate: new Date(),
    endDate: new Date(),
    categories: [
      { name: 'Mould', id: 1 },
      { name: 'Machine', id: 2 },
    ],
  },

  {
    id: 3,
    company: 'Centurion',
    region: 'Lorem ipsum',
    contact: 'hyacinthe.ebula21@gmail.com',
    link: 'www.google.com',
    logoId: 23674,
    logo: '../../assets/images/sponsor4.png',
    startDate: new Date(),
    endDate: new Date(),
    categories: [
      { name: 'Safety', id: 7 },
      { name: 'Mould', id: 8 },
    ],
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
mockAdapter.onGet(`${apiUrl}/Notifications`).reply(() => {
  const response = 200;
  const data = {
    data: NOTIFICATIONS,
  };

  return [response, data];
});

// mocking getSponsors api
mockAdapter.onGet(`${apiUrl}/Promotions`).reply(() => {
  const response = 200;
  const data = {
    data: SPONSORS,
  };

  return [response, data];
});

// mocking get current user api
mockAdapter.onGet(`${apiUrl}/user`).reply(() => {
  const response = 200;
  const data = {
    data: user,
  };

  return [response, data];
});
