var webpack = require('webpack');

module.exports = {
  entry: [
    './src/scripts/index.js'
  ],
  output: {
    publicPath: '/',
    path: __dirname + '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less?$/,
        loader: 'style!css!less',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
