# eslint 使用

ESLint是一个QA工具，用来避免低级错误和统一代码的风格。ESLint被设计为完全可配置的，主要有两种方式来配置ESLint：

- 在注释中配置：使用JavaScript注释直接把配置嵌入到文件中。
- 配置文件：使用一个JSON或YAML文件来为全部的目录和它的子目录指定配置信息。

有很多信息是可以被配置的：

## 一.相关文档

- [atom编辑器使用eslint插件](https://atom.io/packages/linter-eslint)
- [eslint配置规则](http://devnull.guru/get-started-with-eslint/)
- [eslint options](http://eslint.org/docs/rules/)
- [eslint标准配置](http://standardjs.com/)

## 二.安装依赖

1.全局安装eslint

```shell
npm install -g eslint
```

2.在项目中安装eslint模块

```shell
npm install eslint --save-dev
```

## 三.编辑器安装eslint插件(默认是atom)

```shell
apm install linter-eslint
```

```shell
apm install linter
```

## 四.配置

### 1.生成配置文件

如果你的项目还没有配置文件（.eslintrc）的话，可以通过指定--init参数来生成一个新的配置文件：

```shell
eslint --init
```

### 2.开始配置

生成.eslintrc文件后，你可以在这个文件中配置一些规则,如下

- Environments：你的脚本将要运行在什么环境中。
- Globals：额外的全局变量。
- Rules：开启规则和发生错误时报告的等级。

Rules说明

- 0：关闭规则。
- 1：打开规则，并且作为一个警告（不影响exit code）。
- 2：打开规则，并且作为一个错误（exit code将会是1）。

例如:

```javascript
"rules": {
    // 关闭空格规则
    "indent": [
        0,
        "tab"
    ],
    "linebreak-style": [
        2,
        "unix"
    ],
    //字符串使用单引号规则
    "quotes": [
        2,
        "single"
    ],
    //不要加分号
    "semi": [
        0,
        "always"
    ],
    // 定义了但没使用的变量,警告
    "no-unused-vars": [1, { "vars": "all", "args": "none" }]
}
```

## 五.应用

### 1.使用标准配置(standard)

安装依赖包

```shell
npm install standard --save-dev
```

atom编辑器安装插件

```shell
apm install linter-js-standard
```

eslintrc.js文件加入如下配置:

```javascript
"extends": [
    "standard"
]
```

具体配置查看如下文件

```shell
./node_modules/eslint-config-standard/eslintrc.json
```
