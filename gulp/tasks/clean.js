/*******************************************************
 * Clean task
 * clean out the dist folders to remove any files
 * that could be left kicking around before rebuilding
 ******************************************************/
import del from 'del';

module.exports = function(gulp) {
    gulp.task('clean', (cb) => {
        del(['dist'], cb);
    });
}