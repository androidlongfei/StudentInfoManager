'use strict';

/**
 *  排课表
 *
 */

import dbConn from '../../lib/db/dbConn'
import Sequelize from 'sequelize'

const ViewArrangCourse = dbConn.define('viewArrangCourse', {
    arrangCourseId: {
        type: Sequelize.INTEGER,
        field: 'arrang_course_id',
        comment: '课程ID'
    },
    courseName: {
        type: Sequelize.STRING,
        field: 'course_name',
        comment: '课程名字'
    },
    courseCredits: {
        type: Sequelize.INTEGER,
        field: 'course_credits',
        comment: '课程学分'
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '所属院系'
    },
    professional: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '所属专业'
    },
    className: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'class_name',
        comment: '班级名字'
    },
    classId: {
        type: Sequelize.INTEGER,
        field: 'class_id',
        comment: '班级ID'
    },
    teacherName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'teacher_name',
        comment: '授课教师名字'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address',
        comment: '上课地点'
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
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        comment: '课表创建时间'
    }
}, {
    tableName: 'view_arrang_course',
    // 属性get方法
    getterMethods: {

    },
    // 属性set方法
    setterMethods: {

    },
    createdAt: false,
    updatedAt: false,
    comment: '排课视图'
})

module.exports = ViewArrangCourse
ViewArrangCourse.removeAttribute('id')
