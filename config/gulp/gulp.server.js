'use strict';

let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
  }),
  environment = require('./lib/environment.js');
var browserSync = require('browser-sync');

gulp.task('webpack-dev-server', 'Launches webpack-dev-server', ['build'], function () {
  require("../webpack/webpack.dev.server.js");
});

gulp.task('serve', 'Launch the server on development mode, autoreloads it when there are code changes', ['build', 'webpack-dev-server'], function () {

  require('dotenv').load({
    silent: true,
    path: './dist/.env'
  });

  var nodemonConfiguration = {
    script: './dist/server.js',
    watch: ['dist', process.env.DOCS_SOURCE_FOLDER],
    ext: 'jade js md',
    env: {
      'NODE_ENV': 'development'
    }
  };

// Add port to configuration if specified, otherwise leave out so dotenv .env file can be potentially used
  if (environment.get('port', false)) {
    nodemonConfiguration.env.PORT = environment.get('port');
  }

  $.nodemon(nodemonConfiguration)
    //.on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    })
    .on('start', function() {
      // 'restart' is too early; browsers need to be reloaded after the new Node process fully started
      browserSync.reload();
    });

}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
  }
});
