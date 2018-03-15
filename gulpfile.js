const gulp = require('gulp');
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')
const env = require('gulp-env')
const clean = require('gulp-clean')
const watch = require('gulp-watch')
const eslint = require('gulp-eslint')

const isTest = true
const isRelease = true

// 删除已存在的es5文件
gulp.task('clean', function () {
    return gulp.src('dist').pipe(clean());
});

// 将es6转化为es5
gulp.task('babel', ['lint'], function () {
    // ES6 源码存放的路径
    return gulp.src('src/**/*.js')
        // 编译
        .pipe(babel())
        // 转换成 ES5 存放的路径
        .pipe(gulp.dest('dist'))
});

gulp.task('babel_test', function () {
    // ES6 源码存放的路径
    return gulp.src('src/**/*.js')
        // 编译
        .pipe(babel())
        // 转换成 ES5 存放的路径
        .pipe(gulp.dest('dist'))
});

// eslint code
gulp.task('lint', ['clean'], () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src('src/**/*.js')
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

if (isTest) {
    // 将es6转化为es5, 只重新编译更改过的文件
    gulp.src('src/**/*.js')
        // 监控es6文件
        .pipe(watch('src/**/*.js'))
        // 编译
        .pipe(babel())
        // 转换成 ES5 存放的路径
        .pipe(gulp.dest('dist'));

    gulp.task('default', ['babel_test'], function () {
        env('.env.json')
        nodemon({
            script: 'dist/index.js',
            ext: 'js'
        })
    })
} else {
    gulp.task('default', ['babel'], function () {
        if (isRelease) {
            console.log('发布')
        } else {
            // env('.env.json')
            nodemon({
                script: 'dist/index.js',
                ext: 'js'
            })
        }
    })
}
