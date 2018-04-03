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
                    idCardNo: postParameter.idCardNo,
                    name: postParameter.name,
                    gender: postParameter.gender,
                    birth: postParameter.birth,
                    admission: postParameter.admission,
                    classId: postParameter.classId,
                    professional: postParameter.professional,
                    department: postParameter.department
                }
                if (postParameter.age) {
                    newModel.age = postParameter.age
                }
                if (postParameter.address) {
                    newModel.address = postParameter.address
                }
                if (postParameter.telephone) {
                    newModel.telephone = postParameter.telephone
                }
                Student.create(newModel).then(model => {
                    model.studentNo = model.generateStudentNo
                    model.save()
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
                    username: targetModel.idCardNo,
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
                    error.output.payload.message = '查询学生数据发生错误';
                    cb(error);
                })
            },
            // 删除学生
            (targetModel, cb) => {
                targetModel.destroy().then((delModel) => {
                    // debug('classModel', classModel)
                    if (!delModel) {
                        let error = Boom.notAcceptable('学生不存在');
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
                                let error = Boom.notAcceptable('学生-用户不存在');
                                error.output.payload.code = 1032;
                                cb(error);
                            } else {
                                cb(null, delModel.toJSON())
                            }
                        }).catch(err => {
                            let error = Boom.badImplementation();
                            error.output.payload.code = 1033;
                            error.output.payload.dbError = err;
                            error.output.payload.message = '删除学生-用户出错';
                            cb(error);
                        })
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1034;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '删除学生出错';
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
                // 1.查询
                (cb) => {
                    Student.findById(request.params.studentId).then((model) => {
                        debug('查询到学生', model)
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
                // 2.更新学生信息
                (targetModel, cb) => {
                    if (request.payload.idCardNo) {
                        targetModel.idCardNo = request.payload.idCardNo;
                    }
                    if (request.payload.name) {
                        targetModel.name = request.payload.name;
                    }
                    if (request.payload.age) {
                        targetModel.age = request.payload.age;
                    }
                    if (request.payload.gender) {
                        targetModel.gender = request.payload.gender;
                    }
                    if (request.payload.birth) {
                        targetModel.birth = request.payload.birth;
                    }
                    if (request.payload.telephone) {
                        targetModel.telephone = request.payload.telephone;
                    }
                    if (request.payload.admission) {
                        targetModel.admission = request.payload.admission;
                    }
                    if (request.payload.classId) {
                        targetModel.classId = request.payload.classId;
                    }
                    if (request.payload.address) {
                        targetModel.address = request.payload.address;
                    }
                    if (request.payload.department) {
                        targetModel.department = request.payload.department;
                    }
                    if (request.payload.professional) {
                        targetModel.professional = request.payload.professional;
                    }
                    // debug('保存前', classModel)
                    targetModel.save().then(updateModel => {
                        let updateModelJSON = updateModel.toJSON();
                        if (request.payload.idCardNo) {
                            debug('-----', request.payload.idCardNo, updateModelJSON.id)
                            // 更新用户名,重置密码
                            User.findOne({
                                where: {
                                    roleType: role.type.STUDENT,
                                    targetId: updateModelJSON.id
                                }
                            }).then(user => {
                                if (user) {
                                    user.token = null
                                    // user.resetPassword = true
                                    // user.password = setting.detaultPwd
                                    user.username = request.payload.idCardNo
                                    user.save().then(newUser => {
                                        // console.log('newUser-----------+++---', newUser)
                                        cb(null, updateModelJSON);
                                    }).catch(err => {
                                        let error = Boom.badImplementation();
                                        error.output.payload.code = 1012;
                                        error.output.payload.dbError = err;
                                        error.output.payload.message = '查询数据发生错误';
                                        cb(null, updateModelJSON);
                                    })
                                } else {
                                    cb(null, updateModelJSON);
                                }
                            })
                        } else {
                            cb(null, updateModelJSON);
                        }
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
