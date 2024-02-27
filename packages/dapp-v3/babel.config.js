module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'dapp/assets': './assets',
            'dapp/components': './components',
            'dapp/config': './config',
            //'dapp/contracts': './contracts',
            'dapp/essentials': './features/essentials',
            'dapp/spaces': './features/spaces',
            //'dapp/wallet': './features/wallet',
            'dapp/services': './services',
            'dapp/redux': './redux',
            'dapp/utils': './utils',
          },
        },
      ],
    ],
  };
};
