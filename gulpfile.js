const gulp = require('gulp'),
      cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      server = require('tiny-lr')();

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

gulp.task('optimize', function(cb) {
    gulp.src('public/images/background-introduces/non-optimized/*.jpg').
    pipe(imagemin()).
    pipe(gulp.dest('public/images/background-introduces'));
});

gulp.task('watch', function() {
  //server.listen(7000, function( err ) {
    //if ( err ) { return console.log( err ); }
    
      gulp.watch('public/stylesheet/**/*.css', [
        'compress-prefix'
      ]);
      gulp.watch('public/javascript/**/*.js', [
        'minify'
      ]);
  //});
});
