'use strict';

/**
 *  学生表
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
import Student from './Student'
const debug = require('debug')('app:models:Class');
const start = 20181000

const Class = dbConn.define('class', {
    name: {
        type: Sequelize.STRING, // 班级名字
        comment: '班级名字'
    },
    note: {
        type: Sequelize.STRING // 备注
    },
    departmentsNo: {
        type: Sequelize.INTEGER,
        field: 'departments_no' // 所属院系
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at'
    }
}, {
    // 属性get方法
    getterMethods: {},
    // 属性set方法
    setterMethods: {

    },
    comment: '班级表'
})

const create = (classModel) => {
    debug('创建班级前:', classModel.toJSON())
    // classModel.name = start + this.id + ''
    console.log('班级名', classModel.name)
}

const afterCreate = (classModel) => {
    debug('创建班级后:', classModel.toJSON())
    // classModel.name = start + this.id + ''
    console.log('班级名', classModel.name)
}

const update = (classModel) => {
    debug('更新班级信息:', classModel.toJSON())
    // classModel.name = start + this.id + ''
}

Class.hasMany(Student, { foreignKey: 'classId' })


Class.hook('beforeCreate', create);
Class.hook('beforeUpdate', update);
Class.hook('afterCreate', afterCreate);

module.exports = Class;
