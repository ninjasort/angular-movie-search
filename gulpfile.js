var gulp = require('gulp');
var sass = require('gulp-sass');
var rev = require('gulp-rev');
var webserver = require('gulp-webserver');
var karma = require('gulp-karma');

var config = {
    app: 'app'
};

gulp.task('server', function() {
    return gulp.src('app')
        .pipe(webserver({
            livereload: true
        }))
});

gulp.task('styles', function() {
    gulp.src('app/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/styles'));
});

gulp.task('watch', ['server'], function() {
    gulp.watch('app/styles/**/*.scss', function(e) {
        gulp.run('styles');
    });
});

gulp.task('test', function() {
    return gulp.src('./tests')
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'watch'
        })).on('error', function(err) {
            this.emit('end'); //instead of erroring the stream, end it
        });
});