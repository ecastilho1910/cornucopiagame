'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var serveStatic = require('serve-static');
var less = require('gulp-less');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');

gulp.task('styles', function () {
    return gulp.src('app/styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('app/styles'));
});

gulp.task('bundle-vendor-css', function () {
    return gulp.src([
        'bower_components/components-font-awesome/css/fontawesome-all.css',
        'bower_components/angular-toastr/dist/angular-toastr.css',
        'bower_components/angular-loading-bar/build/loading-bar.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest('deploy/styles'));
});

gulp.task('bundle-main-css', function () {
    return gulp.src('app/styles/main.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(rev())
        .pipe(gulp.dest('deploy/styles'));
});

gulp.task('bundle-vendor-js', function () {
    return gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-ui-router/release/stateEvents.js',
        'bower_components/angular-jwt/dist/angular-jwt.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/ngstorage/ngStorage.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        'bower_components/angular-loading-bar/build/loading-bar.js',
        'bower_components/underscore/underscore.js',
        'bower_components/angular-timer/dist/angular-timer.js',
        'bower_components/humanize-duration/humanize-duration.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(rev())
        .pipe(gulp.dest('deploy/scripts'))
        .pipe(uglify())
        .pipe(gulp.dest('deploy/scripts'));
});

gulp.task('bundle-main-js', function () {
    return gulp.src([
        "app/scripts/**"
    ])
        .pipe(concat('main.js'))
        .pipe(rev())
        .pipe(gulp.dest('deploy/scripts'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('deploy/scripts'));
});

gulp.task('clean', function () {
    return gulp.src('deploy').pipe(clean());
});

gulp.task('copy', function () {
    gulp.src([
        'app/images/**',
        'app/views/**',
        'app/404.html',
        'app/menu.html',
        'app/favicon-hacking.ico'
    ], { base: 'app' })
        .pipe(gulp.dest('deploy'));

    gulp.src('bower_components/components-font-awesome/webfonts/**', { base: 'bower_components/components-font-awesome' })
        .pipe(gulp.dest('deploy'));
});

gulp.task('html-inject', function () {
    gulp.src('app/index.html')
        .pipe(inject(gulp.src('deploy/styles/vendor*.css', { read: false }), { name: 'vendor', ignorePath: 'deploy', addRootSlash: false }))
        .pipe(inject(gulp.src('deploy/styles/main*.css', { read: false }), { name: 'main', ignorePath: 'deploy', addRootSlash: false }))
        .pipe(inject(gulp.src('deploy/scripts/vendor*.js', { read: false }), { name: 'vendor', ignorePath: 'deploy', addRootSlash: false }))
        .pipe(inject(gulp.src('deploy/scripts/main*.js', { read: false }), { name: 'main', ignorePath: 'deploy', addRootSlash: false }))
        .pipe(gulp.dest('deploy'));
});

gulp.task('deploy', sequence('clean', 'styles', [
    'bundle-main-css',
    'bundle-vendor-css',
    'bundle-vendor-js',
    'bundle-main-js',
    'copy'
], 'html-inject'));

gulp.task('host', ['styles'], function () {
    var settings = {
        root: 'app',
        host: 'localhost',
        port: '8080',
        fallback: 'app/index.html',
        middleware: function (connect) {
            return [connect().use('/bower_components', serveStatic('bower_components'))];
        }
    };
    connect.server(settings);
    gulp.src('app/index.html')
        .pipe(open({ uri: 'http://' + settings.host + ':' + settings.port, app: 'chrome' }));
});

gulp.task('host-deploy', function () {
    var settings = {
        root: 'deploy',
        host: 'localhost',
        port: '8080',
        fallback: 'deploy/index.html'
    };
    connect.server(settings);
    gulp.src('deploy/index.html')
        .pipe(open({ uri: 'http://' + settings.host + ':' + settings.port, app: 'chrome' }));
});