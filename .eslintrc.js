module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "standard"
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            0, "tab"
        ],
        "linebreak-style": [
            2, "unix"
        ],
        // 字符串使用单引号
        "quotes": [
            2, "single"
        ],
        "semi": [0, "always"],
        "no-inline-comments": 0,
        // 定义了但没使用的变量，警告
        "no-unused-vars": [1, {
            "vars": "all",
            "args": "none"
        }],
        // 使用 === 代替 ==,警告
        "eqeqeq": [1, "always"],
        // 最有只能有两个空行
        "no-multiple-empty-lines": [2, {
            "max": 3,
            "maxBOF": 1
        }],
        // 函数名后面空格,忽略
        "space-before-function-paren": 0,
        "comma-dangle": ["error", "only-multiline"],
    }
};
