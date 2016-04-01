'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcDir = __dirname + '/src';

module.exports = {

  entry: {
    app: srcDir + '/client/entry.ts'
  },
  output: {
    path: srcDir + '/public',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!autoprefixer?browsers=last 2 version!less?sourceMap=true')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]

};
