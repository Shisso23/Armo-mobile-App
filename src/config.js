import Config from 'react-native-config';

const {
  API_LOCATION,
  CLIENT_ID,
  CLIENT_SECRET,
  HOST_URL,
  ENVIRONMENT,
  ONE_SIGNAL_APP_ID,
  STAGING_PRIVACY_POLICY_URL,
} = Config;

export default {
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  hostUrl: HOST_URL,
  apiUrl: `${HOST_URL}${API_LOCATION}`,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  environment: ENVIRONMENT,
  website: 'www.armo.co.za',
  scope: 'openid profile role email offline_access mobileApi',
  oneSignalAppId: ONE_SIGNAL_APP_ID,
  oneSignalTokenKey: 'oneSignalTokenKey',
  stagingPivacyPolicyUrl: STAGING_PRIVACY_POLICY_URL,
};
