'use strict';

const debug = require('debug')('app:controllers:class');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const Class = require('../models/Class');
import Sequelize from 'Sequelize';
const Op = Sequelize.Op;


const classMethods = {
    // 创建班级
    createClass(request, reply) {
        let postParameter = request.payload
        let newClass = {
            name: postParameter.name,
            note: postParameter.note,
            department: postParameter.department
        }
        Class.create(newClass).then(function (classModel) {
            let classModelJSON = classModel.toJSON();
            debug('classModelJSON', classModelJSON);
            setTimeout(() => {
                reply(classModelJSON)
            }, 3000)
        }).catch(function (err) {
            // console.log('err', err);
            let error = Boom.notAcceptable('创建班级失败');
            error.output.payload.code = 1004;
            error.output.payload.dbError = err;
            debug('createClass err', err);
            reply(error);
        });
    },
    // 删除班级
    deleteClass(request, reply) {
        async.waterfall([
            // 查询班级
            (cb) => {
                Class.findOne({
                    where: {
                        id: parseInt(request.params.classId)
                    }
                }).then((classModel) => {
                    // debug('classModel', classModel)
                    if (!classModel) {
                        let error = Boom.notAcceptable('班级不存在');
                        error.output.payload.code = 1029;
                        cb(error);
                    } else {
                        cb(null, classModel);
                    }
                }).catch((err) => {
                    debug('findOneClass', err);
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1030;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询班级数据发生错误';
                    cb(error);
                })
            },
            // 删除班级
            (classModel, cb) => {
                classModel.destroy().then((delClassModel) => {
                    // debug('classModel', classModel)
                    if (!delClassModel) {
                        let error = Boom.notAcceptable('班级不存在');
                        error.output.payload.code = 1031;
                        cb(error);
                    } else {
                        cb(null, delClassModel.toJSON());
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1032;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '删除班级出错';
                    cb(error);
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('删除班级信息', result)
                reply(result)
            }
        })
    },
    // 更新班级
    updateClass(request, reply) {
        async.waterfall([
                // 1.查询班级
                (cb) => {
                    Class.findById(request.params.classId).then((classModel) => {
                        debug('查询到班级', classModel)
                        if (!classModel) {
                            let error = Boom.notAcceptable('班级不存在');
                            error.output.payload.code = 1044;
                            cb(error);
                        } else {
                            cb(null, classModel)
                        }
                    }).catch((err) => {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1045;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '查询数据发生错误';
                        cb(error);
                    })
                },
                // 2.更新班级信息
                (classModel, cb) => {
                    if (request.payload.name) {
                        classModel.name = request.payload.name;
                    }
                    if (request.payload.departmentsNo) {
                        classModel.departmentsNo = request.payload.departmentsNo;
                    }
                    if (request.payload.note) {
                        classModel.note = request.payload.note;
                    }
                    // debug('保存前', classModel)
                    classModel.save().then(function (newUpdateClass) {
                        // debug(uuu);
                        let classInfoJSON = newUpdateClass.toJSON();
                        cb(null, classInfoJSON);
                    }).catch(function (err) {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1046;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '更新班级发生错误';
                        cb(error)
                    })
                }
            ],
            (err, result) => {
                if (err) {
                    reply(err)
                } else {
                    debug('更细班级信息', result)
                    reply(result)
                }
            })
    },
    findOneById(request, reply) {
        async.waterfall([ // 查询班级
            (cb) => {
                findOneClass(request.params.classId, cb);
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('result', result.toJSON())
                reply(result.toJSON())
            }
        });
    },
    // 分页查询
    count(request, reply) {
        debug('count-------------', request.query);
        let queryObj = {};
        let filterWhere = {}
        if (request.query.name) {
            filterWhere.name = {
                [Op.like]: `%${request.query.name}%`
            }
        }
        if (request.query.department) {
            filterWhere.department = {
                [Op.like]: `%${request.query.department}%`
            }
        }
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
                Class.findAndCountAll(queryObj).then(function (classModel) {
                    // debug('classModel', classModel)
                    // setTimeout(() => {
                    //     reply(classModel)
                    // }, 2000)
                    reply(classModel)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询班级失败')
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    debug('createClass err', err);
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
        });
    }
};

// 查询一个班级
function findOneClass(id, cb) {
    // debug('findOneClass', id)
    Class.findOne({
        where: {
            id: parseInt(id)
        }
    }).then((classModel) => {
        // debug('classModel', classModel)
        if (!classModel) {
            let error = Boom.notAcceptable('查询班级数据发生错误, 班级不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else {
            cb(null, classModel);
        }
    }).catch((err) => {
        debug('findOneClass', err);
        let error = Boom.badImplementation();
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        error.output.payload.message = '查询班级数据发生错误';
        cb(error);
    })
};

module.exports = classMethods;
