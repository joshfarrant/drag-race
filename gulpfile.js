'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpNSP = require('gulp-nsp');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('babel', function() {
  return gulp.src('lib/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('nsp', function(cb) {
  gulpNSP({
    package: __dirname + '/package.json'
  }, cb);
});

gulp.task('prepublish', ['nsp', 'babel']);
