var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var autoprefixer = require('less-plugin-autoprefix');
var gulpif = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');


var projectDir = "./VersionPress.DocsSite";

/**
 * Default task reports usage only
 */
gulp.task('default', function (cb) {
    gutil.log('');
    gutil.log('Usage:');
    gutil.log(' ' + gutil.colors.green('gulp less') + '             Quick compilation of changed files only');
    gutil.log(' ' + gutil.colors.green('gulp less-production') + '  Full compilation incl. autoprefixing etc.');
});


// These vars can be set in 'prepare-production-less-build' to influence LESS build
var lessPlugins = [];
var compileOnlyChangedFiles = true;

/**
 * Basic LESS task. Runs less + sourcemaps only by default. See also 'less-production' to
 * include autoprefixer etc.
 */
gulp.task('less', function () {

    var destFolder = projectDir + '/css';

    return gulp.src(projectDir + '/css/style-*.less')
        .pipe(gulpif(compileOnlyChangedFiles, changed(destFolder, { extension: '.css' })))
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: lessPlugins,
            relativeUrls: true // so that e.g. a link to the bg-noise image works from the 'lib' directory
        }))
        .on('error', function (error) {
            console.log(error);
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destFolder));

});

/**
 * Compiles LESS for production. Is generally quite a bit slower as all stylesheet are recompiled
 * and more work is done on them, e.g., vendor prefixes are added etc.
 */
gulp.task('less-production', function (cb) {
    runSequence('prepare-production-less-build', 'clean-css', 'less', cb);
});

/**
 * Sets variables that influence the 'less' task
 */
gulp.task('prepare-production-less-build', function () {
    lessPlugins = [
        new autoprefixer()
    ];
    compileOnlyChangedFiles = false;
});

/**
 * Cleans *.css and *.css.map files
 */
gulp.task('clean-css', function (cb) {
    del([projectDir + '/css/style-*.css', projectDir + '/css/style-*.map'], { force: true }, cb);
});


