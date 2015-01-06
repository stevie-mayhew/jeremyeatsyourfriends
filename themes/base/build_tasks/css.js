
var minify      = require('gulp-minify-css'),
    base64      = require('gulp-base64'),
    notify      = require('gulp-notify'),
    bless       = require('gulp-bless'),
    less        = require('gulp-less'),
    sourcemaps  = require('gulp-sourcemaps'),
    gulp        = require('gulp'),
    del         = require('del'),
    fs          = require('fs');

gulp.task('clean:css', ['bless:css'], function (callback) {
    del(['./production/css'], callback)
});

gulp.task('bundle:css', ['bundle:css:style', 'bundle:css:editor']);

gulp.task('bundle:css:style', function () {
    return gulp.src('./source/css/less/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .on('error', notify.onError())
        .pipe(gulp.dest('./source/css'));
});

gulp.task('bundle:css:editor', function () {
    return gulp.src('./source/css/less/editor.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .on('error', notify.onError())
        .pipe(gulp.dest('./source/css'));
});

gulp.task('base64:css', ['bundle:css'], function () {
    return gulp.src('./source/css/*.css')
        .pipe(base64())
        .pipe(minify())
        .on('error', notify.onError())
        .pipe(gulp.dest('./source/css'));
});

gulp.task('bless:css', ['base64:css'], function () {
    return gulp.src('./source/css/style.css')
        .pipe(bless())
        .on('error', notify.onError())
        .pipe(gulp.dest('./source/css'));
});

gulp.task('copy:css', ['clean:css'], function () {
    return gulp.src('./source/css/*.css')
        .on('error', notify.onError())
        .pipe(gulp.dest('./production/css'));
});