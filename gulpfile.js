const gulp = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const path = require('path');

const babelConfig = require('./babel.config');

module.exports = (root, extras = []) => gulp.task(
  'default',
  () => {
    const src = [
      path.resolve(root, 'src/**/*.js'),
      `!${path.resolve(root, 'src/**/*.{spec,test,fixture}.js')}`,
      `!${path.resolve(root, 'src/**/__{tests,fixtures}__')}`,
      `!${path.resolve(root, 'src/**/__{tests,fixtures}__/*.js')}`,
      ...extras.map((it) => it.replace(/^(!?)(.*)$/, (match, $1, $2) => `${$1}${path.resolve(root, $2)}`)),
    ];
    return gulp.src(src)
      .pipe(babel(babelConfig))
      .pipe(terser())
      .pipe(gulp.dest('dist'));
  },
);
