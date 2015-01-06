
var source      = require('vinyl-source-stream'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    notify      = require('gulp-notify'),
    sourcemaps  = require('gulp-sourcemaps'),
    buffer      = require('vinyl-buffer'),
    browserify  = require('browserify'),
    stripDebug  = require('gulp-strip-debug'),
    gulp        = require('gulp'),
    del         = require('del');

gulp.task('clean:js', function (callback) {
    del(['./production/js'], callback)
});

gulp.task('lint:js', function() {
    return gulp.src('./source/js/src/*.js')
        .pipe(jshint())
        .on('error', notify.onError())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle:js', function() {
    return browserify('./source/js/src/init.js', {debug: true})
        .bundle()
        .on('error', notify.onError())
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./source/js'));
});

gulp.task('copy:js', ['clean:js', 'bundle:js'], function () {
    return gulp.src('./source/js/*.js')
        .pipe(stripDebug())
        .pipe(uglify({preserveComments: 'some'}))
        .on('error', notify.onError())
        .pipe(gulp.dest('./production/js'));
});