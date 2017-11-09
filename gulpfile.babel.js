// @flow
import gulp from 'gulp';
import rename from 'gulp-rename';
import gulpLoadPlugins from 'gulp-load-plugins';
import generateTask from './gulp/tasks/generate';

const plugins = gulpLoadPlugins();

gulp.task('default', () =>
    gulp.src(['./src/**/*.js', '!./src/**/*_test.js'], { base: 'src' })
        .pipe(rename({ extname: '.js.flow' }))
        .pipe(gulp.dest('./lib')));

gulp.task('generate', generateTask(gulp, plugins));
