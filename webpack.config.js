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
            'css-loader!' +
            'autoprefixer-loader?' +
            '{browsers:["Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "Opera >= 12", "Safari >= 6"]}' +
            '!less-loader?sourceMap'
        )
      },
      {
        loader: 'url-loader?limit=32768',
        test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)(\?.*)?$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]

};
