
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const mainSource = './build/';

const source = {
  scss: `${mainSource}scss/`,
  js: `${mainSource}js/`,
  images: `${mainSource}images/`,
  dist: './assets/'
};

//deleting css files before rebuild
gulp.task('del-css', () => {
  del([`${source.dist}css/*.css`, `!${source.dist}css/extras`]).then( paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

//deleting js files before rebuild
gulp.task('del-js', () => {
  del([`${source.dist}js/*.js`, `!${source.dist}js/extras`]).then( paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('js', function() {
    console.log('js task');
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src( `${source.scss}styles.scss` )
        .pipe(sass())
        .pipe(gulp.dest( `${source.dist}css` ))
        .pipe(browserSync.stream());
});

//browsersync configuration
gulp.task('serve', ['del-css', 'del-js', 'sass', 'js'], () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    open: false
  });

  gulp.watch(`${source.scss}**/*.scss`, ['sass']);
  gulp.watch(`${source.js}**/*.js`, ['js']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default',['del-css', 'del-js', 'serve']);

