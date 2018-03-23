/**
 * 创建或者删除表
 */

// import async from 'async'
import createDebug from 'debug'
import moment from 'moment'
import roleConfig from '../../config/role'

const debug = createDebug('app:lib:db:table')

// 用户相关表
import User from '../../models/User'
import Student from '../../models/Student'
import Teacher from '../../models/Teacher'
import Class from '../../models/Class'
import AcdemicDean from '../../models/AcdemicDean'


/**
 * [dropTable 删除表格]
 * @return {[type]} [description]
 */
function dropTable() {
    // User.drop().then(function () {
    //     debug('删除User表')
    // })

    // Student.drop({ force: true }).then(() => {
    //     Class.drop({ force: true }).then(function () {
    //         debug('删除Class表')
    //     })
    // })
}

/**
 * [createTable 创建表格]
 * @param [force:创建表之前会先删除它]
 * @return {[type]} [无返回值]
 */
const createTable = () => {
    // 创建系统用户
    // User.sync({ force: false }).then(() => { createAdmin() })

    // 创建班级
    // Class.sync({ force: false }).then(() => {});

    // 创建学生
    // Student.sync({ force: false }).then(() => {})

    // 创建教师
    Teacher.sync({ force: false }).then(() => {})

    // 创建教务员
    AcdemicDean.sync({ force: false }).then(() => {})
}

/**
 * [createAdmin 创建超级管理员账号]
 * @return {[type]} [description]
 */
const createAdmin = () => {
    User.findOrCreate({
        where: {
            username: 'admin',
            roleType: roleConfig.type.ADMIN
        }
    }).spread((user, isNew) => {
        debug('isNew', isNew)
        if (isNew) {
            user.password = 'admin'
            user.resetPassword = true
            user.roleType = roleConfig.type.ADMIN
            user.save();
        }
        debug('user', user.toJSON());
    }).catch(err => {
        debug('err', err);
    })
}

module.exports = {
    createTable: createTable,
    dropTable: dropTable
}
