
var gulp = require('gulp'),
    del  = require('del');

gulp.task('clean:fonts', function (callback) {
    del(['./production/fonts'], callback)
});

gulp.task('copy:fonts', ['clean:fonts'], function () {
    gulp.src('./source/lib/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./production/fonts'));

    gulp.src('./node_modules/font-awesome/fonts/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./production/fonts'));

    gulp.src('./source/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./production/fonts'));
});