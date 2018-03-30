'use strict';

/**
 *  学生表
 *
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import User from './User'
const debug = require('debug')('app:models:Student');
const start = 201800000

const Student = dbConn.define('student', {
    idCardNo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'id_card_no',
        comment: '身份证号'
    },
    studentNo: {
        type: Sequelize.INTEGER,
        // unique: true,
        // allowNull: false,
        field: 'student_no',
        comment: '学号'
    },
    name: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false,
        comment: '学生名字'
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
    admission: {
        type: Sequelize.DATE, // 入学日期
        comment: '入学日期'
    },
    classId: {
        type: Sequelize.INTEGER,
        field: 'class_id', // 所属班级 (外键)
        comment: '所属班级(外键)'
    },
    age: {
        type: Sequelize.INTEGER,
        comment: '年龄'
    },
    professional: {
        type: Sequelize.STRING,
        comment: '所学专业'
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
        // 自动生成学生编号
        generateStudentNo() {
            if (this.dataValues.id) {
                return start + this.dataValues.id
            }
        }
    },
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

// 将向Student添加一个user_id属性以保存User的主键值
// Student.belongsTo(User, { foreignKey: 'userId' });

Student.hook('beforeCreate', createStudent);
Student.hook('beforeUpdate', updateStudent);

module.exports = Student;
