'use strict';

var srcDir = __dirname + '/src';

module.exports = {

  entry: srcDir + '/client/entry.ts',
  output: {
    path: srcDir + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css?sourceMap!autoprefixer?browsers=last 2 version!less?sourceMap=true'
      }
    ]
  }

};
