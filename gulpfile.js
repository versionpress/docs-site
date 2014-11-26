/// <binding AfterBuild='less' />
var gulp = require('gulp');
var less = require('gulp-less-sourcemap');

var docsSite = './VersionPress.DocsSite';

gulp.task('less', function () {
    gulp.src(docsSite + '/css/**.less')
      .pipe(less())
      .pipe(gulp.dest(docsSite + '/css'));
});
