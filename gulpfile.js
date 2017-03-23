var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('compress-prefix', function (cb) {
    return gulp.src('public/stylesheet/non-compressed/*.css').
    pipe(autoprefixer({ browsers: ["> 0%"] })).
    pipe(cleanCSS({compatibility: 'ie8'})).
    pipe(gulp.dest('public/stylesheet'));
});

gulp.task('minify', function (cb) {
    return gulp.src('public/javascript/non-minified/*.js').
    pipe(uglify()).
    pipe(gulp.dest('public/javascript'));
});
