'use strict';

let gulp = require('gulp');

/**
 * Watches for ts files
 */
gulp.task('tsWatcher', false, function () {
  gulp.watch(['src/**/*.ts'], ['compile'])
});

/**
 * Watches for non-ts files
 */
gulp.task('nonTsWatcher', false, function () {
  gulp.watch(['src/.env', 'src/**/*', '!src/**/*.ts'], ['copyNonTs']);
});

/**
 * Combined watcher
 */
gulp.task('watch', 'Master watch task, adds cumulative watches', ['tsWatcher', 'nonTsWatcher'], function () {
});

/**
 * Combined watch and server
 */
gulp.task('watchAndServe', 'Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task', ['watch', 'serve'], function () {
}, {
  options: {
    'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
  }
});
