var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sequence = require('gulp-sequence');
var util = require('gulp-util');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
var babelRegister = require('babel-core/register');
var sequence = require('gulp-sequence');
var del = require('del');

gulp.task('test', function () {
    gulp.src('test/**/*-test.js', { read: false })
        .pipe(mocha({
            compilers: {
                js: babelRegister
            }
        }))
        .on('error', () => {
            util.log(util.colors.red('**************** TESTS FAILED, will clean dist ****************\n'));
            gulp.start('clean');
        });
});

gulp.task('scripts', function () {
    gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('funky.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    del('dist/**', { force: true });
});

gulp.task('watch', function () {
    gulp.watch('{src/**/*.js,test/**/*.js}', ['test']);
});

gulp.task('build-dev', sequence('test'));
gulp.task('build-dist', sequence('clean', 'test', 'scripts'));


