module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.svg',
        ],
        baseUrl: '.',
        root: ['./src'],
        alias: {
          utils: './src/utils',
          store: './src/store',
          assets: './src/assets',
        },
        cwd: 'babelrc',
      },
    ],
  ],
};
