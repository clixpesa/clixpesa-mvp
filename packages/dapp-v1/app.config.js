require('dotenv').config({ path: __dirname + '/.env' });
const { GOOGLE_SERVICES_JSON, GOOGLE_SERVICES_PLIST } = process.env;

export default {
  expo: {
    name: 'Clixpesa MVP',
    slug: 'dapp-v1',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.clixpesa.dappv1',
      googleServicesFile: GOOGLE_SERVICES_PLIST,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.clixpesa.dappv1',
      googleServicesFile: GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['@react-native-firebase/app', '@react-native-firebase/auth'],
    extra: {
      eas: {
        projectId: '44eedfd8-55bc-4281-9e7c-70c25870df2a',
      },
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/44eedfd8-55bc-4281-9e7c-70c25870df2a',
    },
  },
};
