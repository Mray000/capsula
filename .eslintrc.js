module.exports = {
  root: true,
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
  extends: [
    'react-app',
    'plugin:import/errors',
    'plugin:import/warnings',
    '@react-native-community',
  ],

  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        alias: {
          src: './src',
          utils: './src/utils',
          store: './src/store',
          assets: './src/assets',
        },
      },
    },
  },
};
