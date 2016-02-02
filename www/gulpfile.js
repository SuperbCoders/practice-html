var gulp = require('gulp')
    , sass = require('gulp-sass')
    , templates = require('gulp-jade')
    , minifycss = require('gulp-minify-css')
    , autoprefixer = require('gulp-autoprefixer')
    , uglify = require('gulp-uglify')
    //, jshint = require('gulp-jshint')
    , rename = require('gulp-rename')
    , notify = require('gulp-notify')
    , concat = require('gulp-concat');

gulp.task('default', function () {


});

gulp.task('scripts', function () {
    return gulp.src('./js/**/*.js')
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('templates', function () {
    return gulp.src('./jade/*.jade')
        .pipe(templates({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(notify({message: 'Templates task complete'}));
});

gulp.task('styles', function () {
    return gulp.src('./sass/main_global.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('./sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('./jade/**/*.jade', ['templates']);

});

// sudo npm link gulp-notify
