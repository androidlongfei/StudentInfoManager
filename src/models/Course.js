'use strict';

/**
 *   课程表
 */

import dbConn from '../lib/db/dbConn'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import Student from './Student'
// const debug = require('debug')('app:models:Course');

const Course = dbConn.define('course', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '课程名字'
    },
    credits: {
        type: Sequelize.INTEGER,
        field: 'credits',
        comment: '课程学分'
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

const create = (model) => {}

const afterCreate = (model) => {}

const update = (model) => {}


Course.hook('beforeCreate', create);
Course.hook('beforeUpdate', update);
Course.hook('afterCreate', afterCreate);

module.exports = Course;
