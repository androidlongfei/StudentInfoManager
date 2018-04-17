'use strict';

/**
 *  学生课程成绩视图
 *
 */

import dbConn from '../../lib/db/dbConn'
import Sequelize from 'sequelize'

const ViewStudentCourseScore = dbConn.define('viewStudentCourseScore', {
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
    studentNo: {
        type: Sequelize.INTEGER,
        field: 'student_no',
        comment: '学号'
    },
    score: {
        type: Sequelize.INTEGER,
        comment: '成绩'
    },
    scoreId: {
        type: Sequelize.INTEGER,
        field: 'score_id',
        comment: '成绩ID'
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        comment: '创建时间'
    }
}, {
    tableName: 'view_student_course_score',
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

module.exports = ViewStudentCourseScore
ViewStudentCourseScore.removeAttribute('id')
