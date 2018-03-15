/**
 * 创建或者删除表
 */

import async from 'async'
import createDebug from 'debug'

const debug = createDebug('app:lib:db:table')

// 用户相关表
import User from '../../models/User'

/**
 * [dropTable 删除表格]
 * @return {[type]} [description]
 */
function dropTable() {
    User.drop().then(function () {
        debug('删除User表')
    })
}

/**
 * [createTable 创建表格]
 * @param [force:创建表之前会先删除它]
 * @return {[type]} [无返回值]
 */
function createTable() {
    User.sync({force: true}).then(function () {
        createAdmin()
    })
}

/**
 * [createAdmin 创建超级管理员账号]
 * @return {[type]} [description]
 */
function createAdmin() {
    User.findOrCreate({
        where: {
            username: 'admin',
            realName: '超级管理员'
        }
    }).spread(function (user, isNew) {
        debug('isNew', isNew)
        if (isNew) {
            user.password = 'admin'
            user.resetPassword = true
            user.save();
        }
        // debug('user', user);
    }).catch(function (err) {
        debug('err', err);
    })
}

module.exports = {
    createTable: createTable,
    dropTable: dropTable
}
