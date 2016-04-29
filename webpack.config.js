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
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            'less?sourceMap'
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]

};
