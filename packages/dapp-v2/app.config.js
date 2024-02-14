require('dotenv').config({ path: __dirname + '/.env' });
const { GOOGLE_SERVICES_JSON } = process.env;
export default {
  expo: {
    name: 'Clixpesa MVP',
    slug: 'dapp-v2',
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.clixpesa.dappv2',
      googleServicesFile: GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: ['@react-native-firebase/app', '@react-native-firebase/auth', 'expo-secure-store'],
  },
};
