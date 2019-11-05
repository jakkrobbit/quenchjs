const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

// BrowserSync
function bSync(done) {
    'use strict';
    browserSync.init({
        proxy: 'quenchjs/',
        open: false
    });
    done();
}

function bsReload(done) {
    'use strict';
    browserSync.reload();
    done();
}

// Compile, minify, and prefix CSS
function styles() {
    'use strict';
    return gulp.src(['src/styles/**/*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer( /*'last 2 versions'*/ ))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.stream());
}

// Optimize Images
function images() {
    'use strict';
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [
                    {
                        removeViewBox: true
                    }
                ]
            })
        ])))
        .pipe(gulp.dest('dist/images/'));
}

// Concatenate and minify scripts
function scripts() {
    'use strict';
    return gulp.src(['src/scripts/plugins/*.js', 'src/scripts/app.js'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({
            suffix: '.min'
        }))
//        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.stream());
}

// Update template files
function mstFiles() {
    'use strict';
    return gulp.src('src/scripts/templates/*.mst')
        .pipe(plumber())
        .pipe(gulp.dest('dist/scripts/templates/'))
        .pipe(gulp.dest('templates/'))
        .pipe(browserSync.stream());
}

// Watch Files
function watchFiles() {
    'use strict';
    gulp.watch("src/styles/**/*.scss", styles);
    gulp.watch(['src/scripts/plugins/**/*.js', 'src/scripts/app.js'], scripts);
    gulp.watch(['*.html', '**/*.mst'], bsReload);
    gulp.watch('src/scripts/templates/*.mst', mstFiles);
    gulp.watch("src/images/**/*", images);
}

// Group complex tasks
const build = gulp.parallel(styles, images, scripts);
const watch = gulp.parallel(watchFiles, bSync);

// Export tasks
exports.images = images;
exports.styles = styles;
exports.build = build;
exports.watch = watch;
exports.default = watch;
