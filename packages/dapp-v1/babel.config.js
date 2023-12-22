module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', ['@babel/preset-env', { targets: { node: 'current' } }]],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'dapp/assets': './assets',
            'dapp/components': './components',
            'dapp/config': './config',
            'dapp/contracts': './contracts',
            'dapp/essentials': './features/essentials',
            'dapp/spaces': './features/spaces',
            'dapp/wallet': './features/wallet',
            'dapp/services': './services',
            'dapp/store': './store',
            'dapp/utils': './utils',
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
