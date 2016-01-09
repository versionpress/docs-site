'use strict';

//Dependencies
let gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'del', 'run-sequence']
    }),
    config = require('./gulp.config.json'),
    tsConfig = require('../../tsconfig.json');


/**
 * Create typescript project build reference for incremental compilation under watch tasks
 *
 * @link https://github.com/ivogabe/gulp-typescript
 */
var tsProject = $.typescript.createProject('./tsconfig.json', {
   //  Override package version of typescript to use latest compiler version
    typescript: require('typescript')
});

//var tsProject = $.typescript.createProject('tsconfig.json');

/**
 * Cleans the dist folder
 */
gulp.task('clean', function(){ $.del(['dist'])});

/**
 * Precopies all non-ts files into the dist folder
 */
gulp.task('copyNonTs', false, function(){
gulp.src(['src/.env', 'src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('dist'))}
);

/**
 * Lints typescript code
 */
gulp.task('tslint', 'Runs a typescript linter on the application code', function(){
gulp.src(config.tsLinter.sources)
    .pipe($.tslint(config.tsLinter.options))
    .pipe($.tslint.report(config.tsLinter.reporter))}
);

/**
 * Compiles typescript app into js
 */
gulp.task('compile', false, function(){
    var tsResult = gulp.src(tsConfig.files)
       .pipe($.typescript(tsProject, undefined, $.typescript.reporter.longReporter()));

return tsResult.js
    .pipe(gulp.dest('dist'));
});

/**
 * Build the server app
 */
gulp.task('build', 'Builds the server app (compiles & copies)', function(callback) {
        $.runSequence('clean',
            ['compile'],
            'copyNonTs',
            callback)
    }
);