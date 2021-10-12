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

const SPONSORS = [
  {
    id: 0,
    name: 'Suppliers',
    description: 'Lorem ipsum',
    images: [
      { uri: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg' },
      {
        uri: 'data:image/jpeg;base64,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',
      },
      { uri: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg' },
    ],
  },
  {
    id: 1,
    name: 'Moulders',
    description: 'Lorem ipsumi',
    images: [
      { uri: 'https://www.stockvault.net/data/2019/03/06/261776/thumb16.jpg' },
      {
        uri: 'https://images.unsplash.com/photo-1542353436-312f0e1f67ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      },
      { uri: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg' },
    ],
  },
  {
    id: 2,
    name: 'Consultantss',
    description: 'Lorem ipsum',
    images: [
      {
        uri: 'https://jenmulligandesign.com/wp-content/uploads/2017/04/pexels-beach-tropical-scene-free-stock-photo.jpg',
      },
      {
        uri: 'https://image.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
      },
      {
        uri: 'https://picjumbo.com/wp-content/uploads/woman-holding-an-american-flag-in-a-field-free-photo-1080x1620.jpg',
      },
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
mockAdapter.onGet(`${apiUrl}/notifications`).reply(() => {
  const response = 200;
  const data = {
    data: NOTIFICATIONS,
  };

  return [response, data];
});

// mocking getSponsors api
mockAdapter.onGet(`${apiUrl}/sponsors`).reply(() => {
  const response = 200;
  const data = {
    data: SPONSORS,
  };

  return [response, data];
});
