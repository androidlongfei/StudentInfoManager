'use strict';

/**
 *   成绩表
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import Student from './Student'
// const debug = require('debug')('app:models:Course');

const Score = dbConn.define('score', {
    arrangCourseId: {
        type: Sequelize.INTEGER,
        field: 'arrang_course_id',
        comment: '课程ID'
    },
    studentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        comment: '学生ID'
    },
    score: {
        type: Sequelize.STRING,
        comment: '成绩'
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
    comment: '成绩表'
})

const create = (model) => {}

const afterCreate = (model) => {}

const update = (model) => {}


Score.hook('beforeCreate', create);
Score.hook('beforeUpdate', update);
Score.hook('afterCreate', afterCreate);

module.exports = Score;
