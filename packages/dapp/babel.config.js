module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], //['@babel/preset-env', { targets: { node: 'current' } }]
    /*plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'app-env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],*/
  };
};
