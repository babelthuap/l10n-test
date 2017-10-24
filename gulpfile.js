const gulp = require('gulp');

const clean = require('gulp-clean');
const l10n = require('gulp-l10n');

const Path = {
  BUILD: 'build/',
  HTML: 'src/**/*.html',
  LOCALES: 'locales/',
  LOCALE_JSON: 'locales/*.json',
};

gulp.task('clean', () => {
  return gulp.src(Path.BUILD)
    .pipe(clean());
});

gulp.task('extract-locales', () => {
  return gulp.src(Path.HTML)
    .pipe(l10n.extract())
    .pipe(gulp.dest(Path.LOCALES));
});

gulp.task('load-locales', ['extract-locales'], () => {
  return gulp.src(Path.LOCALE_JSON)
    .pipe(l10n.setLocales());
});

gulp.task('localize', ['load-locales'], () => {
  return gulp.src(Path.HTML)
    .pipe(l10n())
    .pipe(gulp.dest(Path.BUILD));
});

gulp.task('prepare', ['extract-locales']);
gulp.task('default', ['clean', 'localize'], () => {
  // TODO(nicholas): Minify JS and images.
  // TODO(nicholas): Copy CSS and lib JS.  
  gulp.src(Path.HTML)
    .pipe(gulp.dest(Path.BUILD));
});
