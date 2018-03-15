# 将 ES6 代码转换成 ES5

用 Gulp 和 Babel 6 来将 ES6 代码转换成 ES5 代码。

## 1\. 安装依赖

安装全局 Gulp

```shell
npm install -g gulp
```

安装项目中使用的 Gulp

```shell
npm install --save-dev gulp
```

安装 Gulp 上 Babel 的插件

```shell
npm install --save-dev gulp-babel
```

安装 Babel 上将 ES6 转换成 ES5 的插件

```shell
npm install --save-dev babel-preset-es2015
```

## 2\. Gulp 配置

gulpfile.js 的内容，形如

```javascript
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")// ES6 源码存放的路径
    .pipe(babel())
    .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径
});
```

## 3\. Babel 配置

在项目根路径创建文件 .babelrc。内容为

```javascript
{
  "presets": ["es2015"]
}
```

## 4\. 转换

```shell
gulp
```
