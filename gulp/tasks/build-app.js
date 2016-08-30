/*******************************************************
 * Build task
 * Copy files over to the build directory so that we can
 * generate an optimised tar ball that does not include
 * unnecessary files.
 ******************************************************/

module.exports = function(gulp) {
    const distDirectory = './dist/';

    gulp.task('build-app', () => {
        gulp.src('./package.json', { base: './'})
            .pipe(gulp.dest(distDirectory));

        gulp.src('./config/**/*')
            .pipe(gulp.dest(distDirectory + 'config'));

        gulp.src('./assets/translations/**.*')
            .pipe(gulp.dest(distDirectory + 'public/translations'));

        gulp.src('./assets/images/**.*')
            .pipe(gulp.dest(distDirectory + 'public/images'));

        gulp.src('./assets/scripts/**/*.*')
            .pipe(gulp.dest(distDirectory + 'public/scripts'));

        gulp.src('./assets/sounds/**/*.*')
            .pipe(gulp.dest(distDirectory + 'public/sounds'));
    });
};