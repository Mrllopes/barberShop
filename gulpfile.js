var gulp = require('gulp');

var publicCss = 'app/';

var modules_path = [
    'node_modules/angular-material/angular-material.min.css',
    'node_modules/animate.css/animate.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/ng-table/bundles/ng-table.min.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/angular-material-datetimepicker/css/material-datetimepicker.css',
    'node_modules/angular-loading-bar/src/loading-bar.css',
    'node_modules/ng-image-gallery/dist/ng-image-gallery.min.css'

];

var temp_files = [
    './modules.css',
    './app.css'
];

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var clean = require('gulp-clean');
var urlAdjuster = require('gulp-css-url-adjuster');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var cleanCSS = require('gulp-clean-css');



gulp.task('concat-css', function () {
    return gulp.src('app/**/*.css')
        .pipe(concatCss("./app.css"))
        .pipe(gulp.dest('./'));
})


gulp.task('ajust-url-image', ['concat-css'], function () {
    return gulp.src('./app.css').
        pipe(urlAdjuster({
            prependRelative: '/app/',
        }))
        .pipe(gulp.dest('./'));
})

gulp.task('build-css', ['concat-css', 'ajust-url-image'], function () {
    return gulp.src('./app.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.min.css'))
        .pipe(gulp.dest('./dist'));
});



gulp.task('concat-css-modules', function () {
    return gulp.src(modules_path)
        .pipe(concatCss("modules.css"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean-css', ['build-css'], function () {
    return gulp.src(temp_files)
        .pipe(clean());
})


gulp.task('watch', function () {
    gulp.watch(publicCss + '**/*.css', ['concat-css','ajust-url-image', 'concat-css-modules', 'clean-css']);
});

gulp.task('default', ['concat-css','ajust-url-image', 'concat-css-modules', 'clean-css', 'watch']);