'use strict';

/**
 *  教师表
 *
 */

import dbConn from '../lib/db/dbConn'
import gender from '../config/gender'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import User from './User'
const debug = require('debug')('app:models:Teacher');
const startNo = 'T'

const Teacher = dbConn.define('teacher', {
    idCardNo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'id_card_no',
        comment: '身份证号'
    },
    teacherNo: {
        type: Sequelize.STRING,
        // unique: true,
        // allowNull: false,
        field: 'teacher_no',
        comment: '编号'
    },
    name: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false,
        comment: '名字'
    },
    title: {
        // 依次是正高级教师、高级教师、一级教师、二级教师、三级教师
        type: Sequelize.STRING,
        comment: '职称'
    },
    age: {
        type: Sequelize.INTEGER,
        comment: '年龄'
    },
    gender: {
        type: Sequelize.INTEGER,
        comment: '性别'
    },
    birth: {
        type: Sequelize.DATE,
        comment: '生日'
    },
    telephone: {
        type: Sequelize.STRING,
        comment: '电话'
    },
    department: {
        type: Sequelize.STRING,
        comment: '所属院系'
    },
    address: {
        type: Sequelize.JSON,
        comment: '居住地址'
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
    getterMethods: {
        // 自动生成编号
        generateTeacherNo() {
            if (this.dataValues.id) {
                return startNo + this.dataValues.id
            }
        },
        genderValue() {
            if (this.gender) {
                console.log('genderValue', this.dataValues.gender)
                return gender.converTypeToValue(this.dataValues.gender)
            }
        }
    },
    // 属性set方法
    setterMethods: {

    },
    comment: '教师表'
})

let create = (model) => {
    // debug('创建教师:', model.toJSON())
}

let update = (student) => {
    // debug('更新学生信息:', student.toJSON())
}

// 将向Student添加一个user_id属性以保存User的主键值
// Student.belongsTo(User, { foreignKey: 'userId' });

Teacher.hook('beforeCreate', create);
Teacher.hook('beforeUpdate', update);

module.exports = Teacher;
