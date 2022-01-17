import React from 'react';
import { WebView } from 'react-native-webview';
import config from '../../../config';

const PrivacyPolicyWebView = () => {
  return <WebView source={{ uri: config.stagingPivacyPolicyUrl }} />;
};

export default PrivacyPolicyWebView;
