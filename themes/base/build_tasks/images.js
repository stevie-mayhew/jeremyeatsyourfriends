
var gulp = require('gulp'),
    del  = require('del');

gulp.task('clean:images', function (callback) {
    del(['./production/images'], callback)
});

gulp.task('copy:images', ['clean:images'], function () {
    return gulp.src('./source/images/**/*.{gif,png,jpg,jpeg}')
        .pipe(gulp.dest('./production/images'));
});