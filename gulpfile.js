var gulp = require('gulp');
var gulpUglify = require('gulp-uglify');
var gulpConcat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');
var gulpUtil = require('gulp-util');
var jest = require('jest-cli');
var gulpSequence = require('gulp-sequence');

gulp.task('test', function() {
    jest.runCLI({ config : { rootDir: '__tests__' } }, ".", (e) => {
        if (e.numFailedTests === 0) {
            gulpUtil.log("All test passed");
        } else {
            gulpUtil.log("********** TESTS FAILED **********");
        }
    });
});

gulp.task('scripts', function() {
    gulp.src('src/*.js')
        .pipe(gulpConcat('funky.min.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build-dev', gulpSequence('test'));
gulp.task('build-dist', gulpSequence('test', 'scripts'));


