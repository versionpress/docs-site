'use strict';

var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var ts = require('gulp-typescript');
var util = require('gulp-util');
var webpack = require('webpack-stream');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

var distDir = __dirname + '/dist';
var srcDir = __dirname + '/src';

/**
 * Cleans the dist folder
 */
gulp.task('clean', false, function() {
  return del([distDir + '/**', '!' + distDir], {dot: true});
});

/**
 * Copies non-source-code files to dist folder
 */
gulp.task('copy-files', false, function() {
  return gulp.src([srcDir + '/.env', srcDir + '/public/img/**', srcDir + '/views/**'], {base: srcDir})
    .pipe(gulp.dest(distDir));
});


/**
 * Compiles server-side TypeScript
 */
gulp.task('compile-server', false, function() {

  // this is a workaround until tsconfig.json supports fileGlobs
  var tsFilesToProcess =  require('./tsconfig.json').filesGlob;
  var tsProject = ts.createProject('tsconfig.json');

  var tsResult = gulp.src(tsFilesToProcess)
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest(distDir));
});

gulp.task('compile-client', false, function(cb) {

  return gulp.src('src/client/entry.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/public'));

});

/**
 * Builds the app
 */
gulp.task('build', 'Builds app to `dist` folder', function(cb) {
  runSequence('clean',
    ['compile-server', 'compile-client', 'copy-files'],
    cb);
});



gulp.task('nodemon', false, ['build'], function() {

  require('dotenv').load({
    silent: true,
    path: distDir + '/.env'
  });

  var nodemonConfiguration = {
    script: distDir + '/server.js',
    watch: [distDir, process.env.DOCS_SOURCE_FOLDER],
    ext: 'jade js md',
    env: {
      'NODE_ENV': 'development',
      'PORT': process.env.PORT
    }
  };


  nodemon(nodemonConfiguration)
    .on('restart', function() {
      console.log('restarted!');
    })
    .on('start', function() {
      // 'restart' is too early; browsers need to be reloaded after the new Node process fully started
      browserSync.reload();
    });

  gulp.watch(['src/**/*.ts'], ['compile-server']);
  gulp.watch(['src/.env', 'src/**/*', '!src/**/*.ts'], ['compile-client', 'copy-files']);
});


/**
 * Combined watch and server
 */
gulp.task('watch', 'Starts Node server, watches MD and JS files, reloads browser via Browsersync', ['nodemon', 'start-browsersync'], function() {
});

gulp.task('start-browsersync', false, ['nodemon'], function() {
  require('dotenv').load({
    silent: false,
    path: distDir + '/.env'
  });
  browserSync({
    proxy: 'http://localhost:' + process.env.PORT,
    port: parseInt(process.env.PORT) + 1,
    notify: false
  });
});


gulp.task('default', 'Shows help', ['help']);
