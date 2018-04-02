'use strict';

/**
 *  学生表
 *
 */

import dbConn from '../../lib/db/dbConn'
import gender from '../../config/gender'
// import moment from 'moment'
import Sequelize from 'sequelize'
// const debug = require('debug')('app:models:views.viewStudentClass')

const ViewStudentClass = dbConn.define('viewStudentClass', {
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    userName: {
        type: Sequelize.STRING,
        field: 'user_name'
    },
    roleType: {
        type: Sequelize.INTEGER,
        field: 'role_type'
    },
    className: {
        type: Sequelize.STRING,
        field: 'class_name'
    },
    classDepartment: {
        type: Sequelize.STRING,
        field: 'class_department'
    },
    studentId: {
        type: Sequelize.INTEGER,
        field: 'student_id'
    },
    idCardNo: {
        type: Sequelize.INTEGER,
        field: 'id_card_no'
    },
    studentNo: {
        type: Sequelize.INTEGER,
        field: 'student_no'
    },
    studentName: {
        type: Sequelize.STRING,
        field: 'student_name'
    },
    gender: {
        type: Sequelize.INTEGER
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
    age: {
        type: Sequelize.INTEGER,
        comment: '年龄'
    },
    professional: {
        type: Sequelize.STRING,
        comment: '所学专业'
    },
    studentDepartment: {
        type: Sequelize.STRING,
        field: 'student_department'
    },
    address: {
        type: Sequelize.JSON,
        comment: '居住地址'
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        comment: '学生创建时间'
    }
}, {
    tableName: 'view_student_class',
    // 属性get方法
    getterMethods: {
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
    createdAt: false,
    updatedAt: false,
    comment: '学生班级视图'
})

module.exports = ViewStudentClass
ViewStudentClass.removeAttribute('id')
