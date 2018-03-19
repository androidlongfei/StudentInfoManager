'use strict';

/**
 *  学生表
 *
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
const debug = require('debug')('app:models:Student');
const start = 201800000

const Student = dbConn.define('student', {
    studentNo: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        field: 'student_no'
    },
    name: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.INTEGER
    },
    birth: {
        type: Sequelize.DATE
    },
    telephone: {
        type: Sequelize.STRING,
    },
    admission: {
        type: Sequelize.DATE // 入学日期
    },
    classId: {
        type: Sequelize.INTEGER,
        field: 'class_id' // 所属班级 (外键)
    },
    address: {
        type: Sequelize.JSON,
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
    comment: '学生表'
})

let createStudent = (student) => {
    debug('创建学生:', student.toJSON())
    // student.studentNo = start + student.id
    console.log('学号', student.studentNo)
}

let updateStudent = (student) => {
    debug('更新学生信息:', student.toJSON())
}

// User.hasMany(RelationUserGroup, { foreignKey: 'userId' });
// User.hasMany(RelationUserRole, { foreignKey: 'userId' });


Student.hook('beforeCreate', createStudent);
Student.hook('beforeUpdate', updateStudent);

module.exports = Student;
