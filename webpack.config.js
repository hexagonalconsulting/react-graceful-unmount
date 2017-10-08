const webpack = require('webpack');
const path = require('path');

const config = {

  entry: path.resolve('main.js'),

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'withGracefulUnmount',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  }

};
module.exports = config;