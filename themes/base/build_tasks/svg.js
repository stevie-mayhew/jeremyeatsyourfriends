
var svgConfig,
    fs          = require('fs'),
    del         = require('del'),
    gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify'),
    svgmin      = require('gulp-svgmin');

svgConfig = {
    mode: 'symbols',
    preview: false,
    templates: {symbols: fs.readFileSync('./build_tasks/symbols.svg', 'utf-8')}
};

gulp.task('clean:svg', function (callback) {
    del(['./production/svg'], callback)
});

gulp.task('copy:svg', ['clean:svg'], function () {
    return gulp.src('./source/svg/**/*')
        .pipe(svgmin())
        .pipe(gulp.dest('./production/svg'));
});