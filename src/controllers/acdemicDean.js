'use strict';

const debug = require('debug')('app:controllers:acdemicDean');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const AcdemicDean = require('../models/AcdemicDean');
const User = require('../models/User');

const setting = require('../config/setting');
const role = require('../config/role');
import Sequelize from 'Sequelize';
const Op = Sequelize.Op;
const db = require('../lib/db/dbConn');

const acdemicDeanMethods = {
    // 创建
    create(request, reply) {
        db.transaction().then(t => {
            async.waterfall([
                // 判断是否存在
                (cb) => {
                    AcdemicDean.findOne({
                        where: {
                            idCardNo: request.payload.idCardNo
                        }
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
                        error.output.payload.dbError = err
                        cb(error)
                    })
                },
                (cb) => {
                    let postParameter = request.payload
                    let newModel = {
                        idCardNo: postParameter.idCardNo,
                        name: postParameter.name,
                        gender: postParameter.gender,
                        birth: postParameter.birth,
                        telephone: postParameter.telephone,
                        department: postParameter.department,
                        address: postParameter.address,
                        age: postParameter.age
                    }
                    AcdemicDean.create(newModel, { transaction: t }).then(model => {
                        model.updateAttributes({ acdemicDeanNo: model.generateAcdemicDeanNo }, {
                            transaction: t
                        }).then(data => {
                            if (data) {
                                debug('教务员编号', data.acdemicDeanNo)
                                cb(null, data.toJSON())
                            } else {
                                let error = Boom.badData('创建失败,教务员编号出错')
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
                        let error = Boom.badData('创建失败,请联系管理员');
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
                        roleType: role.type.ACDEMIC
                    }
                    User.create(newUser, { transaction: t }).then(user => {
                        let userJSON = user.toJSON()
                        userJSON.baseInfo = targetModel
                        cb(null, userJSON)
                    }).catch(function (err) {
                        let error = Boom.badData('创建失败,请联系管理员');
                        error.output.payload.code = 1005;
                        error.output.payload.dbError = err;
                        cb(error)
                    })
                }
            ], (err, result) => {
                if (err) {
                    debug('创建教务员失败,事务回滚', err)
                    t.rollback()
                    reply(err)
                } else {
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
                    AcdemicDean.findOne({
                        where: {
                            id: parseInt(request.params.acdemicDeanId)
                        }
                    }).then((model) => {
                        if (!model) {
                            let error = Boom.badData('删除失败,教务员不存在')
                            error.output.payload.code = 1029;
                            cb(error);
                        } else {
                            cb(null, model);
                        }
                    }).catch((err) => {
                        let error = Boom.badData('删除失败,请联系管理员');
                        error.output.payload.code = 1005;
                        error.output.payload.dbError = err;
                        cb(error);
                    })
                },
                // 删除
                (targetModel, cb) => {
                    targetModel.destroy({ transaction: t }).then((delModel) => {
                        if (!delModel) {
                            let error = Boom.badData('删除失败,请联系管理员');
                            error.output.payload.code = 1031;
                            cb(error);
                        } else {
                            User.destroy({
                                where: {
                                    targetId: parseInt(targetModel.id)
                                },
                                transaction: t
                            }).then(delUserModel => {
                                if (!delUserModel) {
                                    let error = Boom.badData('删除失败,请联系管理员');
                                    error.output.payload.code = 1032;
                                    cb(error);
                                } else {
                                    cb(null, delModel.toJSON())
                                }
                            }).catch(err => {
                                let error = Boom.badData('删除失败,请联系管理员');
                                error.output.payload.code = 1033;
                                error.output.payload.dbError = err;
                                cb(error);
                            })
                        }
                    }).catch((err) => {
                        let error = Boom.badData('删除失败,请联系管理员');
                        error.output.payload.code = 1034;
                        error.output.payload.dbError = err;
                        cb(error);
                    })
                }
            ], (err, result) => {
                if (err) {
                    debug('删除教务员失败,事务回滚', err)
                    t.rollback()
                    reply(err)
                } else {
                    t.commit();
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
                        AcdemicDean.findById(request.params.acdemicDeanId).then((model) => {
                            if (!model) {
                                let error = Boom.badData('更新失败,教务员不存在')
                                error.output.payload.code = 1044;
                                cb(error);
                            } else {
                                cb(null, model)
                            }
                        }).catch((err) => {
                            let error = Boom.badData('更新失败,请联系管理员')
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
                                        roleType: role.type.ACDEMIC,
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
                                            let error = Boom.badData('更新失败,请联系管理员')
                                            error.output.payload.code = 1012;
                                            error.output.payload.dbError = err;
                                            cb(error);
                                        })
                                    } else {
                                        cb(null, updateModelJSON);
                                    }
                                }).catch(err => {
                                    let error = Boom.badData('更新失败,请联系管理员')
                                    error.output.payload.code = 1012;
                                    error.output.payload.dbError = err;
                                    cb(error);
                                })
                            } else {
                                cb(null, updateModelJSON);
                            }
                        }).catch(err => {
                            let error = Boom.badData('更新失败,请联系管理员')
                            error.output.payload.code = 1012;
                            error.output.payload.dbError = err;
                            cb(error)
                        })
                    }
                ],
                (err, result) => {
                    if (err) {
                        debug('更新教务员失败,事务回滚', err)
                        t.rollback()
                        reply(err)
                    } else {
                        t.commit();
                        reply(result)
                    }
                });
        })
    },
    // 根据学生ID查询学生信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                findOne(request.params.acdemicDeanId, cb);
            }
        ], (err, result) => {
            if (err) {
                let error = Boom.badData('查询失败,请联系管理员')
                error.output.payload.code = 1012;
                error.output.payload.dbError = err;
                reply(error)
            } else {
                reply(result)
            }
        });
    },
    // 分页查询
    count(request, reply) {
        let queryObj = {};
        let filterWhere = {}
        if (request.query.acdemicDeanNo) {
            filterWhere.acdemicDeanNo = {
                [Op.like]: `%${request.query.acdemicDeanNo}%`
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
        async.waterfall([
            (cb) => {
                AcdemicDean.findAndCountAll(queryObj).then(function (model) {
                    reply(model)
                }).catch(function (err) {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('查询失败')
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
    AcdemicDean.findOne({
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
        let error = Boom.badData('查询失败,请联系管理员')
        error.output.payload.code = 1012;
        error.output.payload.dbError = err;
        cb(error);
    })
};

module.exports = acdemicDeanMethods;
