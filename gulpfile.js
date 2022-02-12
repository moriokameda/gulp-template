'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    pugPHPFilter = require('pug-php-filter'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();


gulp.task('default', ["browser-sync","watch"], () => {
    browserSync.reload;
})
// pugをhtmlファイル化
gulp.task('pug', () => {
    return gulp
        .src(['src/pug/**/*.pug','!src/pug/**/_*.pug'])
        .pipe(pug({
            pretty: true
        }))
        .pipe( gulp.dest('./public/'));
})
// sassをcssファイル化
gulp.task('sass', () => {
    return gulp
        .src(['./src/sass/**/*.scss', '!./src/sass/**/_*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(gulp.dest('./public/css'));
})
// jsをmin.js化
gulp.task('js-minify', () => {
    return gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./public/js/'))
})

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: "http://localhost",
        port: 3000,
    })
})
// watch
gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.scss', gulp.task('sass'))
    gulp.watch('./src/pug/**/*.pug', gulp.task('pug'))
    gulp.watch('./src/js/*.js', gulp.task('js-minify'))
})