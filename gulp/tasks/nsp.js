/**********************************************************************
 * nsp is the main command line interface to the Node Security Project.
 * It allows for auditing a package.json or npm-shrinkwrap.json
 * file against the API.
 **********************************************************************/

import gulpNSP from 'gulp-nsp';
import packageJSON from '../../package.json';

// don't stop gulp flow if some vulnerabilities
// have been found

module.exports = function(gulp){
    gulp.task('nsp', function (cb) {
        gulpNSP({
            package: packageJSON,
            stopOnError: false
        }, cb);
    });
};