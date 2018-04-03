'use strict';

const debug = require('debug')('app:controllers:teacher');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const Teacher = require('../models/Teacher');
const User = require('../models/User');

const setting = require('../config/setting');
const role = require('../config/role');
import Sequelize from 'Sequelize';
const Op = Sequelize.Op;

const teacherMethods = {
    // 创建
    create(request, reply) {
        async.waterfall([
            (cb) => {
                let postParameter = request.payload
                let newModel = {
                    idCardNo: postParameter.idCardNo,
                    name: postParameter.name,
                    gender: postParameter.gender,
                    title: postParameter.title,
                    birth: postParameter.birth,
                    telephone: postParameter.telephone,
                    department: postParameter.department,
                    address: postParameter.address,
                    age: postParameter.age
                }
                debug('create teacher', postParameter)
                Teacher.create(newModel).then(model => {
                    model.teacherNo = model.generateTeacherNo
                    debug('model.teacherNo', model.teacherNo)
                    model.save()
                    let modelJSON = model.toJSON();
                    debug('create teacher success', modelJSON);
                    cb(null, modelJSON)
                }).catch(err => {
                    console.log('err', err);
                    let error = Boom.notAcceptable('创建教师失败');
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    cb(error)
                });
            },
            (targetModel, cb) => {
                let newUser = {
                    username: targetModel.idCardNo,
                    password: setting.detaultPwd,
                    targetId: targetModel.id,
                    roleType: role.type.TEACHER
                }
                User.create(newUser).then(user => {
                    let userJSON = user.toJSON()
                    debug('用户---教师', userJSON)
                    userJSON.baseInfo = targetModel
                    cb(null, userJSON)
                }).catch(function (err) {
                    let error = Boom.notAcceptable('创建教师用户失败');
                    error.output.payload.code = 1005;
                    error.output.payload.dbError = err;
                    debug('create student-user err', error);
                    cb(error)
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('创建教师信息', result)
                reply(result)
            }
        })
    },
    // 删除
    delete(request, reply) {
        async.waterfall([
            // 查询
            (cb) => {
                Teacher.findOne({
                    where: {
                        id: parseInt(request.params.teacherId)
                    }
                }).then((model) => {
                    // debug('classModel', classModel)
                    if (!model) {
                        let error = Boom.notAcceptable('教师不存在')
                        error.output.payload.code = 1029;
                        cb(error);
                    } else {
                        cb(null, model);
                    }
                }).catch((err) => {
                    debug('findOneClass', err);
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1030;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                })
            },
            // 删除
            (targetModel, cb) => {
                targetModel.destroy().then((delModel) => {
                    // debug('classModel', classModel)
                    if (!delModel) {
                        let error = Boom.notAcceptable('教师不存在');
                        error.output.payload.code = 1031;
                        cb(error);
                    } else {
                        // 删除学生-用户账号
                        // debug('studentId', targetModel.id)
                        User.destroy({
                            where: {
                                targetId: parseInt(targetModel.id)
                            }
                        }).then(delUserModel => {
                            if (!delUserModel) {
                                let error = Boom.notAcceptable('教师-用户不存在');
                                error.output.payload.code = 1032;
                                cb(error);
                            } else {
                                cb(null, delModel.toJSON())
                            }
                        }).catch(err => {
                            let error = Boom.badImplementation();
                            error.output.payload.code = 1033;
                            error.output.payload.dbError = err;
                            error.output.payload.message = '删除教师-用户出错';
                            cb(error);
                        })
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1034;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '删除教师出错';
                    cb(error);
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('删除学生信息', result)
                reply(result)
            }
        })
    },
    // 更新
    update(request, reply) {
        async.waterfall([
                // 1.查询
                (cb) => {
                    Teacher.findById(request.params.teacherId).then((model) => {
                        debug('查询到', model)
                        if (!model) {
                            let error = Boom.notAcceptable('不存在');
                            error.output.payload.code = 1044;
                            cb(error);
                        } else {
                            cb(null, model)
                        }
                    }).catch((err) => {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1045;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '查询数据发生错误';
                        cb(error);
                    })
                },
                // 2.更新信息
                (targetModel, cb) => {
                    if (request.payload.name) {
                        targetModel.name = request.payload.name;
                    }
                    if (request.payload.departments) {
                        targetModel.department = request.payload.department;
                    }
                    if (request.payload.title) {
                        targetModel.title = request.payload.title;
                    }
                    // debug('保存前', classModel)
                    targetModel.save().then(updateModel => {
                        let updateModelJSON = updateModel.toJSON();
                        cb(null, updateModelJSON);
                    }).catch(err => {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1046;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '更新信息';
                        cb(error)
                    })
                }
            ],
            (err, result) => {
                if (err) {
                    reply(err)
                } else {
                    debug('更细信息', result)
                    reply(result)
                }
            });
    },
    // 根据学生ID查询学生信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                findOne(request.params.teacherId, cb);
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('findOneById student', result)
                reply(result)
            }
        });
    },
    // 分页查询
    count(request, reply) {
        debug('count-------------', request.query);
        let queryObj = {};
        let filterWhere = {}
        if (request.query.teacherNo) {
            filterWhere.teacherNo = {
                [Op.like]: `%${request.query.teacherNo}%`
            }
        }
        // 模糊匹配 %value%
        if (request.query.department) {
            filterWhere.department = {
                [Op.like]: `%${request.query.department}%`
            }
        }
        // 按照时间排序(DESC:降序,ASC:升序)
        queryObj.order = [
            ['createdAt', 'DESC']
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
                Teacher.findAndCountAll(queryObj).then(function (model) {
                    reply(model)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询失败')
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

// 查询一个学生
function findOne(id, cb) {
    // debug('findOneClass', id)
    Teacher.findOne({
        where: {
            id: parseInt(id)
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
        debug('findOneClass', err);
        let error = Boom.badImplementation();
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        error.output.payload.message = '查询数据发生错误';
        cb(error);
    })
};

module.exports = teacherMethods;
