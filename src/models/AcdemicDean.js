'use strict';

/**
 *  教务员表
 *  负责日常教学工作组织管理、教学秩序管理、教学档案管理
 *  如:课程安排,采集学生和教师信息,成绩统计等
 *
 */

import dbConn from '../lib/db/dbConn'
import gender from '../config/gender'
// import moment from 'moment'
import Sequelize from 'sequelize'
// import User from './User'
// const debug = require('debug')('app:models:AcdemicDean');
const startNo = 'A'

const AcdemicDean = dbConn.define('acdemic_dean', {
    idCardNo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'id_card_no',
        comment: '身份证号'
    },
    acdemicDeanNo: {
        type: Sequelize.STRING,
        field: 'acdemic_dean_no',
        comment: '编号'
    },
    name: {
        type: Sequelize.STRING,
        // unique: true,
        allowNull: false,
        comment: '名字'
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
    address: {
        type: Sequelize.JSON,
        comment: '居住地址'
    },
    department: {
        type: Sequelize.STRING,
        comment: '所属院系'
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
        generateAcdemicDeanNo() {
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
    comment: '教务员表'
})

let create = (model) => {
    // debug('创建教师:', model.toJSON())
}

let update = (student) => {
    // debug('更新学生信息:', student.toJSON())
}

AcdemicDean.hook('beforeCreate', create);
AcdemicDean.hook('beforeUpdate', update);

module.exports = AcdemicDean;
