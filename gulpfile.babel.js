import gulp          from 'gulp';

import babel         from 'gulp-babel';
import sourcemaps    from 'gulp-sourcemaps';
import documentation from 'gulp-documentation';

gulp.task('scripts', () => {
    return gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ["es2015"]}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('docs', () => {
    return gulp.src('./src/**/*.js')
        .pipe(documentation({ shallow: true, format: 'html' }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('default', ['scripts', 'docs']);