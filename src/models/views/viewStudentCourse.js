'use strict';

/**
 *  学生课程
 *
 */

import dbConn from '../../lib/db/dbConn'
import Sequelize from 'sequelize'

const ViewStudentCourse = dbConn.define('viewArrangCourse', {
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
    teacherName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'teacher_name',
        comment: '教师名字'
    },
    semester: {
        type: Sequelize.STRING,
        field: 'semester',
        comment: '学期'
    },
    studentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        comment: '学生ID'
    },
    studentName: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'student_name',
        comment: '学生名字'
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        comment: '课表创建时间'
    }
}, {
    tableName: 'view_student_course',
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

module.exports = ViewStudentCourse
ViewStudentCourse.removeAttribute('id')
