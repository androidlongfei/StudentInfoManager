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
const db = require('../lib/db/dbConn');

const teacherMethods = {
    // 创建
    create(request, reply) {
        db.transaction().then(t => {
            async.waterfall([
                // 判断是否存在
                (cb) => {
                    Teacher.findOne({
                        where: {
                            idCardNo: request.payload.idCardNo
                        },
                        transaction: t
                    }).then(model => {
                        if (model) {
                            let error = Boom.badData('创建失败，该账号已存在');
                            error.output.payload.code = 1004;
                            cb(error)
                        } else {
                            cb(null)
                        }
                    }).catch(err => {
                        let error = Boom.badData('创建失败，请联系管理员');
                        error.output.payload.code = 1004;
                        debug(err)
                    })
                },
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
                    // debug('create teacher', postParameter)
                    Teacher.create(newModel, { transaction: t }).then((model) => {
                        model.updateAttributes({ studentNo: model.generateTeacherNo }, {
                            transaction: t
                        }).then(data => {
                            if (data) {
                                debug('更新教师编号', data.toJSON())
                                cb(null, data.toJSON())
                            } else {
                                let error = Boom.badData('创建失败,请联系管理员')
                                error.output.payload.code = 1004
                                cb(error)
                            }
                        }).catch((err) => {
                            let error = Boom.badData('创建失败,请联系管理员')
                            error.output.payload.code = 1004
                            error.output.payload.dbError = err
                            cb(error)
                        });
                    }).catch(err => {
                        let error = Boom.badData('创建失败,请联系管理员')
                        error.output.payload.code = 1004
                        error.output.payload.dbError = err
                        cb(error)
                    })
                },
                (targetModel, cb) => {
                    let newUser = {
                        username: targetModel.idCardNo,
                        password: setting.detaultPwd,
                        targetId: targetModel.id,
                        roleType: role.type.TEACHER
                    }
                    User.create(newUser, { transaction: t }).then(user => {
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
                    debug('创建教师失败,事务回滚', err)
                    t.rollback()
                    reply(err)
                } else {
                    // debug('创建教师信息', result)
                    t.commit();
                    reply(result)
                }
            })
        })
    },
    // 删除
    delete(request, reply) {
        db.transaction().then(t => {
            async.waterfall([
                // 查询
                (cb) => {
                    Teacher.findOne({
                        where: {
                            id: parseInt(request.params.teacherId)
                        },
                        transaction: t
                    }).then((model) => {
                        // debug('classModel', classModel)
                        if (!model) {
                            let error = Boom.badData('教师不存在')
                            error.output.payload.code = 1029;
                            cb(error);
                        } else {
                            cb(null, model);
                        }
                    }).catch((err) => {
                        let error = Boom.badData('删除出错，请联系管理员');
                        error.output.payload.code = 1030;
                        error.output.payload.dbError = err;
                        cb(error);
                    })
                },
                // 删除
                (targetModel, cb) => {
                    targetModel.destroy({ transaction: t }).then((delModel) => {
                        // debug('classModel', classModel)
                        if (!delModel) {
                            let error = Boom.badData('教师不存在');
                            error.output.payload.code = 1031;
                            cb(error);
                        } else {
                            // 删除学生-用户账号
                            // debug('studentId', targetModel.id)
                            User.destroy({
                                where: {
                                    targetId: parseInt(targetModel.id)
                                },
                                transaction: t
                            }).then(delUserModel => {
                                if (!delUserModel) {
                                    let error = Boom.notAcceptable('用户不存在');
                                    error.output.payload.code = 1032;
                                    cb(error);
                                } else {
                                    cb(null, delModel.toJSON())
                                }
                            }).catch(err => {
                                let error = Boom.badData('删除出错，请联系管理员');
                                error.output.payload.code = 1033;
                                error.output.payload.dbError = err;
                                cb(error);
                            })
                        }
                    }).catch((err) => {
                        let error = Boom.badData('删除出错，请联系管理员');
                        error.output.payload.code = 1034;
                        error.output.payload.dbError = err;
                        cb(error);
                    })
                }
            ], (err, result) => {
                if (err) {
                    debug('删除失败,事务回滚', err)
                    t.rollback()
                    reply(err)
                } else {
                    t.commit()
                    reply(result)
                }
            })
        })
    },
    // 更新
    update(request, reply) {
        db.transaction().then(t => {
            async.waterfall([
                    // 1.查询
                    (cb) => {
                        Teacher.findById(request.params.teacherId).then((model) => {
                            if (!model) {
                                let error = Boom.badData('更新失败，请联系管理员');
                                error.output.payload.code = 1044;
                                cb(error);
                            } else {
                                cb(null, model)
                            }
                        }).catch((err) => {
                            let error = Boom.badData('更新失败，请联系管理员');
                            error.output.payload.code = 1045;
                            error.output.payload.dbError = err;
                            cb(error);
                        })
                    },
                    // 2.更新信息
                    (targetModel, cb) => {
                        if (request.payload.idCardNo) {
                            targetModel.idCardNo = request.payload.idCardNo;
                        }
                        if (request.payload.name) {
                            targetModel.name = request.payload.name;
                        }
                        if (request.payload.gender) {
                            targetModel.gender = request.payload.gender;
                        }
                        if (request.payload.title) {
                            targetModel.title = request.payload.title;
                        }
                        if (request.payload.birth) {
                            targetModel.birth = request.payload.birth;
                        }
                        if (request.payload.telephone) {
                            targetModel.telephone = request.payload.telephone;
                        }
                        if (request.payload.department) {
                            targetModel.department = request.payload.department;
                        }
                        if (request.payload.address) {
                            targetModel.address = request.payload.address;
                        }
                        if (request.payload.age) {
                            targetModel.age = request.payload.age;
                        }
                        // debug('保存前', classModel)
                        targetModel.save({ transaction: t }).then(updateModel => {
                            let updateModelJSON = updateModel.toJSON();
                            if (request.payload.idCardNo) {
                                // 更新用户名,重置token
                                User.findOne({
                                    where: {
                                        roleType: role.type.TEACHER,
                                        targetId: updateModelJSON.id
                                    },
                                    transaction: t
                                }).then(user => {
                                    if (user) {
                                        user.token = null
                                        user.username = request.payload.idCardNo
                                        user.save({ transaction: t }).then(newUser => {
                                            cb(null, updateModelJSON);
                                        }).catch(err => {
                                            let error = Boom.badData('更新失败，请联系管理员');
                                            error.output.payload.code = 1012;
                                            error.output.payload.dbError = err;
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
                            let error = Boom.badData('更新失败，请联系管理员');
                            error.output.payload.code = 1046;
                            error.output.payload.dbError = err;
                            cb(error)
                        })
                    }
                ],
                (err, result) => {
                    if (err) {
                        debug('更新失败,事务回滚', err)
                        t.rollback()
                        reply(err)
                    } else {
                        t.commit()
                        reply(result)
                    }
                });
        })
    },
    // 根据
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                findOne(request.params.teacherId, cb);
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        });
    },
    // 分页查询
    count(request, reply) {
        // debug('count-------------', request.query);
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
        if (request.query.name) {
            filterWhere.name = {
                [Op.like]: `%${request.query.name}%`
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
        // debug('queryObj', queryObj)
        async.waterfall([ // 查询班级
            (cb) => {
                Teacher.findAndCountAll(queryObj).then(model => {
                    reply(model)
                }).catch(err => {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询失败，请联系管理员')
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    reply(error);
                });
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                // debug('result', result.toJSON())
                reply(result.toJSON())
            }
        });
    }
};

function findOne(id, cb) {
    Teacher.findOne({
        where: {
            id: parseInt(id)
        }
    }).then((targetModel) => {
        if (!targetModel) {
            let error = Boom.badData('查询数据发生错误, 不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else {
            cb(null, targetModel.toJSON());
        }
    }).catch((err) => {
        let error = Boom.badData('查询数据发生错误, 不存在');
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        cb(error);
    })
};

module.exports = teacherMethods;
