# 密码加密

## 一.bcrypt-nodejs

### 1.安装

```shell
npm install --save bcrypt-nodejs
```

### 2.相关文档

- [github相关文档](https://github.com/shaneGirish/bcrypt-nodejs)
- [npm相关文档](https://www.npmjs.com/package/bcrypt-nodejs)

### 3.例子

### 加密

```javascript
import bcrypt from 'bcrypt-nodejs'

// 创建用户时调用此方法
let setHashPassword = function(user) {
    debug('create user')
    if (user.password) {
        let salt = bcrypt.genSaltSync();
        let cryptedPassword = bcrypt.hashSync(user.password, salt);
        debug(`password:${user.password},cryptedPassword:${cryptedPassword}`)
        user.password = cryptedPassword;
    }
}
```

### 解密

```javascript
//登录时调用此方法
function(user, cb) {
    debug('query user password',user.password)
    bcrypt.compare(password, user.password, function(err, isPasswordPassed) {
        if (err) {
            let error = '验证密码时出错，请联系管理员';
            cb(error)
        } else {
            if (isPasswordPassed) {
                cb(null, user);
            } else {
                let error = '用户名或密码错误'
                cb(error);
            }
        }
    })
},
```
