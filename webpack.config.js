const path              = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
 
module.exports = {
  devtool: "source-map",
  mode: 'development',
  entry: {
    main: './script/main.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};