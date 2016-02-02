'use strict';

let gulp = require('gulp-help')(require('gulp'));

require('require-dir')('./config/gulp');

gulp.task('default', 'Default task: run build', ['help']);