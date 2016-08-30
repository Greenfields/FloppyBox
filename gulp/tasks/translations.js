import yaml from 'gulp-yaml';

module.exports = function(gulp) {
    return gulp.task('translations', function () {
        gulp.src('./locale/*.yaml')
            .pipe(yaml())
            .pipe(gulp.dest('./assets/translations'))
    });
};
