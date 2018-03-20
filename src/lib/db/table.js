/**
 * 创建或者删除表
 */

import async from 'async'
import createDebug from 'debug'
import moment from 'moment'
import roleConfig from '../../config/role'

const debug = createDebug('app:lib:db:table')

// 用户相关表
import User from '../../models/User'
import Student from '../../models/Student'
import Class from '../../models/Class'

/**
 * [dropTable 删除表格]
 * @return {[type]} [description]
 */
function dropTable() {
    // User.drop().then(function () {
    //     debug('删除User表')
    // })

    // Student.drop({ force: false }).then(() => {
    //     Class.drop({ force: false }).then(function () {
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
    // User.sync({ force: true }).then(function () {
    //     createAdmin()
    // })

    // 创建班级
    Class.sync({ force: false }).then(() => {
        console.log('创建班级表1')
        createClass()
        Student.sync({ force: false }).then(() => {
            console.log('创建学生表2')
        })
    });
}

const createClass = () => {
    Class.findOrCreate({
        where: {
            name: '20181005',
            note: '班级备注'
        }
    }).spread((classModel, isNew) => {
        debug('class isNew', isNew)
        if (!isNew) {
            createStudent(classModel.classId)
        }
    }).catch(err => {
        debug('err', err)
    })
}

const createStudent = (classId) => {
    console.log('开始创建学生', classId)
    let student = {
        name: '张三',
        studentNo: 2,
        gender: 1,
        birth: moment().format('YYYY-MM-DD'),
        telephone: '18600900941',
        admission: '2014-07-01',
        classId: 1,
        address: '北京市'
    }
    Student.create(student).then((student) => {
        console.log('创建', student)
    }).catch(err => {
        debug('err', err)
    })
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
