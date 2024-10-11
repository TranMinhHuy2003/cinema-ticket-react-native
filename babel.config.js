module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-class-properties',  { "loose": true }],
    ['@babel/plugin-transform-private-methods',  { "loose": true }],
    ['@babel/plugin-transform-private-property-in-object',  { "loose": true }],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};