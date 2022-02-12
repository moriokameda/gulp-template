'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug'),
    pugPHPFilter = require('pug-php-filter'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

gulp.task('watch',['browserSync'], () => {
    return watch('public/**/*.*', () => {
        gulp.start('execution')
    })
});

gulp.task('execution', (calback) => {
    runSequence(
        ['sass', 'pug', 'babel'],
        'reload',
        calback
    )
});

gulp.task('browserSync', () => {
    browserSync.init({
        proxy: 'vccw.test'
    });
});

gulp.task('reload', () => {
    browserSync.reload();
});

gulp.task('sass', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('pug', () => {
    let option = {
        pretty: true,
        filters: {
            php: pugPHPFilter
        }
    }
    return gulp.src('src/pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug(option))
        .pipe(rename({
            extname: '.php'
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('babel', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/js/'));
});