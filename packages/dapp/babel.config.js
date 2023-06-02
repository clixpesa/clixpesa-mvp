module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@dapp/assets': './assets',
            '@dapp/components': './components',
            '@dapp/features': './features',
            '@dapp/data': './data.js',
            '@dapp/utils': './utils',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: 'app-env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
