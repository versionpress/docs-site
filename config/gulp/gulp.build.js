'use strict';

//Dependencies
let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'run-sequence']
  }),
  config = require('./gulp.config.json'),
  tsConfig = require('../../tsconfig.json'),
  webpack = require('webpack'),
  webpackConfig = require('../webpack/webpack.config.js')(false);

/**
 * Create typescript project build reference for incremental compilation under watch tasks
 *
 * @link https://github.com/ivogabe/gulp-typescript
 */
var tsProject = $.typescript.createProject('tsconfig.json');
/**
 * Cleans the dist folder
 */
gulp.task('clean', function () {
  $.del(['dist'])
});

/**
 * Precopies all non-ts files into the dist folder
 */
gulp.task('copyNonTs', false, function () {
    gulp.src(['src/.env', 'src/**/*', '!src/**/*.ts', '!src/public/js/**/*','!src/public/less/**/*'])
      .pipe($.chmod(666))
      .pipe(gulp.dest('dist'))
  }
);

/**
 * Lints typescript code
 */
gulp.task('tslint', 'Runs a typescript linter on the application code', function () {
    gulp.src(config.tsLinter.sources)
      .pipe($.tslint(config.tsLinter.options))
      .pipe($.tslint.report(config.tsLinter.reporter))
  }
);

/**
 * Compiles typescript app into js
 */
gulp.task('compile', false, function () {
  var tsResult = gulp.src(tsConfig.filesGlob)
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject));

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', 'Builds sources for client side', function () {

  webpack(webpackConfig, function (err, stats) {
    var jsonStats = stats.toJson();
    var buildError = err || jsonStats.errors[0] || jsonStats.warnings[0];

    if (buildError) {
      throw new $.util.PluginError('webpack', buildError);
    }
    if (err) throw new $.util.PluginError("webpack", err);
    $.util.log("[webpack]", stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }));
  });
});

/**
 * Build the server app
 */
gulp.task('build', 'Builds the server app (compiles & copies)', function (callback) {
    $.runSequence('clean',
      ['tslint','compile'],
      'copyNonTs',
      'webpack',
      callback)
  }
);
