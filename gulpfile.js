'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	webserver = require('gulp-webserver'),
	sequence = require('gulp-sequence'),
	del = require('del')

	var options = {
  src: 'src',
  dist: 'dist'
};


gulp.task("scripts", function() {
	 return gulp.src(['js/circle/autogrow.js',
			  'js/circle/circle.js'])
	.pipe(concat('js/global.js'))
	.pipe(maps.init())
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('dist/scripts'))
	})


gulp.task('styles', function() {
	 return gulp.src('sass/global.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(rename('all.min.css'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('dist/styles'))
})

gulp.task('images', function(){
	 return gulp.src('images/*' )
	.pipe(imagemin())
	.pipe(gulp.dest('dist/content'))
})

gulp.task('icons', function(){
  return gulp.src(['icons/*','icons/*/*'])
    .pipe(gulp.dest('dist/content/icons'))
});

gulp.task('serve', function(){
	gulp.src('./')
	.pipe(webserver({		
		port: 3000,
		open: true
	}))
	
})


 
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task("build",  sequence('clean', ['scripts', 'styles', 'images', 'icons']));


gulp.task('default',['build'], function(){
	gulp.src('./')
	.pipe(webserver({		
		port: 3000,
		open: true
	}))

});



