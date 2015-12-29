import gulp from 'gulp';
// import jshint from 'gulp-jshint';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import usemin from 'gulp-usemin';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import clean from 'gulp-clean';
import browserify from 'browserify';
import ngAnnotate from 'gulp-ng-annotate';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-minify-html';
import browserSync from 'browser-sync';
import karma from 'gulp-karma';

var config = {
  app: 'app'
};

// Styles
// ----------------------------------------
gulp.task('styles', () => {
  return gulp.src('./src/styles/core.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

// // Linting
// // ----------------------------------------
// gulp.task('lint', ['styles'], () => {
//   return gulp.src(['app/scripts/**/*.js'])
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// BrowserSync
// ----------------------------------------
gulp.task('browserSync', ['pipeline'], () => {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

// Clean
// ----------------------------------------
gulp.task('clean', () => {
  return gulp.src('./dist')
    .pipe(clean());
});

// 
// ----------------------------------------
gulp.task('usemin', ['clean', 'styles'], () => {
  return gulp.src('./src/app/*.html')
    .pipe(usemin({
      html: [minifyHtml()]
    }))
    .pipe(gulp.dest('./dist'));
});

// Pipeline - styles, lint, browserify
// ----------------------------------------
gulp.task('pipeline', ['usemin'], () => {
  
  // images
  gulp.src([
    './src/assets/img/**'
  ], {base: './src'})
    .pipe(gulp.dest('dist'));

  // views
  gulp.src([
    './src/app/views/**'
  ], {base: './src/app/views'})
    .pipe(gulp.dest('dist/views'));
  
  // fonts, icons
  gulp.src([
    './src/lib/Materialize/font/**',
  ])
  .pipe(gulp.dest('dist/assets/fonts'));
  
  // js bundle
  return browserify('./src/app/app.js')
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source('moviesearch.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('/dist/js'))
    .pipe(gulp.dest('./dist/js'));
});


// Test
// ----------------------------------------
// gulp.task('test', () => {
//   return gulp.src('./tests')
//     .pipe(karma({
//       configFile: 'test/karma.conf.js',
//       action: 'watch'
//     })).on('error', (err) => {
//       this.emit('end'); //instead of erroring the stream, end it
//     });
// });

// -------------------------------------------------
// Watchers
// -------------------------------------------------
gulp.task('watch', ['browserSync'], () => {
  gulp.watch([
    'src/app/**/*.js',
    'src/styles/**/*.scss'
  ], ['pipeline']);
});
