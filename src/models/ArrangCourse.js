'use strict';

/**
 *  排课表
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import Student from './Student'
// const debug = require('debug')('app:models:ArrangCourse');

const ArrangCourse = dbConn.define('arrang_course', {
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'course_id',
        comment: '课程ID'
    },
    classId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'class_id',
        comment: '课程所属班级'
    },
    teacherId: {
        type: Sequelize.INTEGER,
        field: 'teacher_id',
        comment: '课程所属老师'
    },
    time: {
        type: Sequelize.JSON,
        comment: '上课时间'
    },
    startTime: {
        type: Sequelize.DATE,
        field: 'start_time',
        comment: '开课时间'
    },
    endTime: {
        type: Sequelize.DATE,
        field: 'end_time',
        comment: '结课时间'
    },
    semester: {
        type: Sequelize.STRING,
        field: 'semester',
        comment: '学期'
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
    comment: '排课表'
})

const create = (model) => {}

const afterCreate = (model) => {}

const update = (model) => {}


ArrangCourse.hook('beforeCreate', create);
ArrangCourse.hook('beforeUpdate', update);
ArrangCourse.hook('afterCreate', afterCreate);

module.exports = ArrangCourse
