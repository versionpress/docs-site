/// <binding AfterBuild='less' />
var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var sourcemaps = require('gulp-sourcemaps');

var docsSite = './VersionPress.DocsSite';

gulp.task('less', ['less-only', 'autoprefix']);

gulp.task('less-only', function () {
    return gulp.src(docsSite + '/css/**.less')
        .pipe(less())
        .pipe(gulp.dest(docsSite + '/css'));
});

gulp.task('autoprefix', ['less-only'], function () {
    return gulp.src(docsSite + '/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(docsSite + '/css'));
});
