'use strict';

let gulp = require('gulp');
var browserSync = require('browser-sync');

/**
 * Watches for ts files
 */
gulp.task('tsWatcher', false, ['serve'], function () {
  gulp.watch(['src/**/*.ts'], ['compile'])
});

/**
 * Watches for non-ts files
 */
gulp.task('nonTsWatcher', false, ['serve'], function () {
  gulp.watch(['src/.env', 'src/**/*', '!src/**/*.ts'], ['copyNonTs']);
});

/**
 * Combined watcher
 */
gulp.task('watch', 'Master watch task, adds cumulative watches', ['tsWatcher', 'nonTsWatcher', 'serve'], function () {
});

/**
 * Combined watch and server
 */
gulp.task('watchAndServe', 'Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task', ['watch', 'serve', 'startBrowserSync'], function () {
}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
  }
});

gulp.task('startBrowserSync', false, ['serve'], function() {
  require('dotenv').load({
    silent: false,
    path: './dist/.env'
  });
  browserSync({
    proxy: 'http://localhost:' + process.env.PORT,
    port: parseInt(process.env.PORT) + 1,
    notify: false
  });
});
