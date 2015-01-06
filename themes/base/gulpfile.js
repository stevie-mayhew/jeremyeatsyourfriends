var fonts       = require('./build_tasks/fonts'),
    images      = require('./build_tasks/images'),
    css         = require('./build_tasks/css'),
    svg         = require('./build_tasks/svg'),
    js          = require('./build_tasks/js'),
    gulp        = require('gulp'),
    del         = require('del');


gulp.task('watch', function () {
    process.env.NODE_ENV = 'development';
    gulp.watch(['./source/css/less/**/*.less'], ['bundle:css']);
    gulp.watch(['./source/js/src/**/*.js'], ['bundle:js']);
    gulp.watch(['./source/svg/*.svg'], ['bundle:svg']);
});

gulp.task('clean', function (callback) {
    return del(['./production'], callback);
});

gulp.task('build:prod', ['copy:css', 'copy:js', 'copy:fonts', 'copy:images', 'copy:svg']);

gulp.task('build:dev', function() {
    process.env.NODE_ENV = 'development';
    gulp.start('build:prod');
});

gulp.task('build', function() {
    process.env.NODE_ENV = 'production';
    gulp.start('build:prod');
});
gulp.task('default', ['build']);