'use strict';

const debug = require('debug')('app:controllers:student');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const Student = require('../models/Student');
const User = require('../models/User');

const setting = require('../config/setting');
const role = require('../config/role');

const studentMethods = {
    // 创建学生
    create(request, reply) {
        async.waterfall([
            (cb) => {
                let postParameter = request.payload
                let newModel = {
                    studentNo: postParameter.studentNo,
                    name: postParameter.name,
                    gender: postParameter.gender,
                    birth: postParameter.birth,
                    telephone: postParameter.telephone,
                    admission: postParameter.admission,
                    classId: postParameter.classId,
                    address: postParameter.address
                }
                Student.create(newModel).then(model => {
                    let modelJSON = model.toJSON();
                    debug('create student success', modelJSON);
                    cb(null, modelJSON)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('创建学生失败');
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    debug('create student err', err);
                    cb(error)
                });
            },
            (targetModel, cb) => {
                let newUser = {
                    username: targetModel.name,
                    password: setting.detaultPwd,
                    targetId: targetModel.id,
                    roleType: role.type.STUDENT
                }
                User.create(newUser).then(user => {
                    let userJSON = user.toJSON()
                    debug('用户---学生', userJSON)
                    userJSON.baseInfo = targetModel
                    cb(null, userJSON)
                }).catch(function (err) {
                    let error = Boom.notAcceptable('创建学生用户失败');
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
                debug('创建学生信息', result)
                reply(result)
            }
        })
    },
    // 删除学生
    delete(request, reply) {
        async.waterfall([
            // 查询
            (cb) => {
                Student.findOne({
                    where: {
                        id: parseInt(request.params.studentId)
                    }
                }).then((model) => {
                    // debug('classModel', classModel)
                    if (!model) {
                        let error = Boom.notAcceptable('学生不存在');
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
                    error.output.payload.message = '查询班级数据发生错误';
                    cb(error);
                })
            },
            // 删除
            (targetModel, cb) => {
                targetModel.destroy().then((delModel) => {
                    // debug('classModel', classModel)
                    if (!delModel) {
                        let error = Boom.notAcceptable('学生不存在');
                        error.output.payload.code = 1031;
                        cb(error);
                    } else {
                        cb(null, delModel.toJSON());
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
                debug('删除学生信息', result)
                reply(result)
            }
        })
    },
    // 更新学生
    update(request, reply) {
        async.waterfall([
                // 1.查询班级
                (cb) => {
                    Student.findById(request.params.studentId).then((model) => {
                        debug('查询到班级', model)
                        if (!model) {
                            let error = Boom.notAcceptable('班级不存在');
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
                // 2.更新班级信息
                (targetModel, cb) => {
                    if (request.payload.name) {
                        targetModel.name = request.payload.name;
                    }
                    if (request.payload.departmentsNo) {
                        targetModel.departmentsNo = request.payload.departmentsNo;
                    }
                    if (request.payload.note) {
                        targetModel.note = request.payload.note;
                    }
                    // debug('保存前', classModel)
                    targetModel.save().then(updateModel => {
                        let updateModelJSON = updateModel.toJSON();
                        cb(null, updateModelJSON);
                    }).catch(err => {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1046;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '更新学生信息';
                        cb(error)
                    })
                }
            ],
            (err, result) => {
                if (err) {
                    reply(err)
                } else {
                    debug('更细学生信息', result)
                    reply(result)
                }
            });
    },
    // 根据学生ID查询学生信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                findOne(request.params.studentId, cb);
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
};

// 查询一个学生
function findOne(id, cb) {
    // debug('findOneClass', id)
    Student.findOne({
        where: {
            id: parseInt(id)
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
};

module.exports = studentMethods;
