'use strict';

const debug = require('debug')('app:controllers:views:viewStudentCourseScore');
const async = require('async');
const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const ViewStudentCourseScore = require('../../models/views/viewStudentCourseScore');
import Sequelize from 'Sequelize';
const Op = Sequelize.Op;


const ViewStudentMethods = {
    // 分页查询
    count(request, reply) {
        debug('count-------------', request.query);
        let queryObj = {};
        let filterWhere = {}
        _.each(request.query, (value, key) => {
            // debug('key', key)
            if (key !== 'currentPage' && key !== 'pageSize') {
                if (value) {
                    filterWhere[key] = {
                        [Op.like]: `%${value}%`
                    }
                }
            }
        })

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
                ViewStudentCourseScore.findAndCountAll(queryObj).then(function (classModel) {
                    reply(classModel)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询失败')
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
    // 根据ID查询信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                // debug('findOneClass', id)
                ViewStudentCourseScore.findOne({
                    where: {
                        scoreId: parseInt(request.params.scoreId)
                    }
                }).then((targetModel) => {
                    // debug('classModel', classModel)
                    if (!targetModel) {
                        let error = Boom.notAcceptable('查询数据发生错误, 不存在');
                        error.output.payload.code = 1029;
                        cb(error);
                    } else {
                        cb(null, targetModel.toJSON());
                    }
                }).catch((err) => {
                    debug('find', err);
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1030;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('findOneById', result)
                reply(result)
            }
        });
    }
}

module.exports = ViewStudentMethods
