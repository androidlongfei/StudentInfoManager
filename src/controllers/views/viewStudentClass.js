'use strict';

const debug = require('debug')('app:controllers:views:viewStudentClass');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const ViewStudentClass = require('../../models/views/viewStudentClass');
import Sequelize from 'Sequelize';
const Op = Sequelize.Op;


const ViewStudentMethods = {
    // 分页查询
    count(request, reply) {
        debug('count-------------', request.query);
        let queryObj = {};
        let filterWhere = {}
        if (request.query.className) {
            filterWhere.className = {
                [Op.like]: `%${request.query.className}%`
            }
        }
        // 模糊匹配 %value%
        if (request.query.studentDepartment) {
            filterWhere.studentDepartment = {
                [Op.like]: `%${request.query.studentDepartment}%`
            }
        }

        if (request.query.idCardNo) {
            filterWhere.idCardNo = {
                [Op.like]: `%${request.query.idCardNo}%`
            }
        }

        if (request.query.studentNo) {
            filterWhere.studentNo = {
                [Op.like]: `%${request.query.studentNo}%`
            }
        }

        // 按照时间排序(DESC:降序,ASC:升序)
        queryObj.order = [
            ['createTime', 'DESC']
        ]
        if (request.query.currentPage && request.query.pageSize) {
            let currentPage = request.query.currentPage
            let pageSize = request.query.pageSize
            let offset = (currentPage - 1) * pageSize
            // offset是跳过offset条数据开始
            queryObj.offset = offset
            queryObj.limit = pageSize
        }
        queryObj.where = filterWhere
        debug('queryObj', queryObj)
        async.waterfall([ // 查询班级
            (cb) => {
                ViewStudentClass.findAndCountAll(queryObj).then(function (classModel) {
                    reply(classModel)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询学生失败')
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    debug('query err', err);
                    reply(error);
                });
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('result', result.toJSON())
                reply(result.toJSON())
            }
        })
    },
    // 根据学生ID查询学生信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                // debug('findOneClass', id)
                ViewStudentClass.findOne({
                    where: {
                        studentId: parseInt(request.params.studentId)
                    }
                }).then((targetModel) => {
                    // debug('classModel', classModel)
                    if (!targetModel) {
                        let error = Boom.notAcceptable('查询学生数据发生错误, 学生不存在');
                        error.output.payload.code = 1029;
                        cb(error);
                    } else {
                        cb(null, targetModel.toJSON());
                    }
                }).catch((err) => {
                    debug('findOneClass', err);
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1030;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询学生数据发生错误';
                    cb(error);
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('findOneById student', result)
                reply(result)
            }
        });
    }
}

module.exports = ViewStudentMethods
