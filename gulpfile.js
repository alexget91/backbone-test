const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const server = require('browser-sync').create();
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

gulp.task('style', () => gulp.src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest('build/css'))
  .pipe(minify())
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream())
);

gulp.task('scripts', () => gulp.src('src/js/index.js')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(rollup({
    plugins: [
      resolve({browser: true}),
      commonjs(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', {modules: false}]
        ]
      })
    ]
  }, 'iife'))
  .pipe(uglify())
  .pipe(rename('bundle.js'))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('build/js'))
);

gulp.task('html', () => gulp.src('src/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'))
  .pipe(server.stream())
);

gulp.task('templates', () => gulp.src('src/templates/*.handlebars')
  .pipe(handlebars())
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(declare({
    root: 'exports',
    noRedeclare: true,
  }))
  .pipe(concat('templates.js'))
  .pipe(wrap('var Handlebars = require("handlebars/dist/handlebars.min.js");\n <%= contents %>'))
  .pipe(gulp.dest('assets'))
);

gulp.task('clean', () => del('build'));

gulp.task('js-watch', gulp.series('scripts', (done) => {
  server.reload();
  done();
}));

gulp.task('templates-watch', gulp.series('templates', 'scripts', (done) => {
  server.reload();
  done();
}));

gulp.task('serve', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/**/*.js', gulp.series('js-watch'));
  gulp.watch('src/templates/**/*.handlebars', gulp.series('templates-watch'));
});

gulp.task('build', gulp.series(
  'clean',
  'style',
  'templates',
  'scripts',
  'html'
));
