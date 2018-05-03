'use strict';

const debug = require('debug')('app:controllers:user');
const async = require('async');
// const _ = require('underscore');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const AcdemicDean = require('../models/AcdemicDean');

const setting = require('../config/setting');
const role = require('../config/role');
const db = require('../lib/db/dbConn');

const userMethods = {
    // 登录
    login(request, reply) {
        let username = request.payload.username;
        let password = request.payload.password;
        async.waterfall([
            // 查询用户
            (cb) => {
                User.findOne({
                    where: {
                        username: username
                    }
                }).then((user) => {
                    if (user) {
                        if (user.isDisabled) {
                            let error = Boom.badData('账号被管理员禁用，不能登录');
                            error.output.payload.code = 10001;
                            cb(error);
                        } else {
                            cb(null, user);
                        }
                    } else {
                        let error = Boom.badData('用户名或密码错误');
                        error.output.payload.code = 10001;
                        cb(error);
                    }
                }).catch((err) => {
                    let error = Boom.badData('系统异常,请联系管理员');
                    error.output.payload.code = 10001;
                    error.output.payload.dbError = err;
                    cb(error);
                })
            },
            // 验证密码
            (user, cb) => {
                bcrypt.compare(password, user.password, (err, isPasswordPassed) => {
                    if (err) {
                        let error = Boom.badData();
                        error.output.payload.code = 10001;
                        error.output.payload.message = '验证密码时出错，请联系管理员';
                        cb(error)
                    } else {
                        if (isPasswordPassed) {
                            let userInfoJSON = user.toJSON();
                            user.lastLoginDate = new Date();
                            cb(null, userInfoJSON, user);
                        } else {
                            let error = Boom.badData('用户名或密码错误');
                            error.output.payload.code = 10001;
                            cb(error);
                        }
                    }
                })
            },
            // 创建token
            (userInfoJSON, userInstance, cb) => {
                if (userInfoJSON.token) {
                    delete userInfoJSON.token
                }
                let token = jwt.sign(userInfoJSON, setting.SECRET, { expiresIn: setting.TokenExpirationSeconds });
                userInfoJSON.token = token
                userInfoJSON.tokenExpirationAt = moment().add(setting.TokenExpirationSeconds, 's').format();
                // 保存tocken到数据库
                userInstance.token = token
                userInstance.save().then(newUser => {
                    cb(null, userInfoJSON)
                }).catch(err => {
                    let error = Boom.badData('系统异常，请联系管理员');
                    error.output.payload.dbError = err
                    error.output.payload.code = 1006;
                })
            },
            // 获取用户角色基本信息
            (userInfo, cb) => {
                userInfo.baseInfo = {}
                if (userInfo.roleType === role.type.ADMIN) {
                    // 系统管理员
                    cb(null, userInfo)
                } else {
                    if (userInfo.roleType === role.type.STUDENT) {
                        // 学生
                        Student.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(student => {
                            if (student) {
                                userInfo.baseInfo = student.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            let error = Boom.badData('系统异常，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                            cb(error)
                        })
                    } else if (userInfo.roleType === role.type.TEACHER) {
                        // 教务员
                        Teacher.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(teacher => {
                            if (teacher) {
                                userInfo.baseInfo = teacher.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            let error = Boom.badData('系统异常，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                        })
                    } else if (userInfo.roleType === role.type.ACDEMIC) {
                        // 教师
                        AcdemicDean.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(acdemicDean => {
                            if (acdemicDean) {
                                userInfo.baseInfo = acdemicDean.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            let error = Boom.badData('系统异常，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                        })
                    }
                }
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                request.user = result
                reply(result);
            }
        })
    },
    // 更改密码
    changePassword(request, reply) {
        async.waterfall([
            // 验证身份
            (cb) => {
                debug('changePassword', request.params.userId, request.user.id)
                if (request.params.userId === request.user.id) {
                    cb(null)
                } else {
                    let error = Boom.unauthorized('身份验证失败，不能修改密码');
                    error.output.payload.code = 1008;
                    cb(error);
                }
            },
            // 查询用户
            (cb) => {
                User.findById(request.params.userId).then(user => {
                    if (user.isDeleted) {
                        let error = Boom.forbidden('用户被管理员删除，不能修改密码');
                        error.output.payload.code = 1009;
                        cb(error);
                    } else if (user.isDisabled) {
                        let error = Boom.notAcceptable('用户被管理员禁用，不能修改密码');
                        error.output.payload.code = 1009;
                        cb(error);
                    } else {
                        cb(null, user)
                    }
                }).catch(err => {
                    let error = Boom.badData('修改密码失败,请联系管理员');
                    error.output.payload.dbError = err;
                    cb(error);
                });
            },
            // 验证旧密码
            (user, cb) => {
                if (bcrypt.compareSync(request.payload.oldPassword, user.password)) {
                    cb(null, user)
                } else {
                    let error = Boom.unauthorized('旧密码不正确');
                    cb(error);
                }
            },
            // 修改密码
            (user, cb) => {
                user.password = request.payload.newPassword;
                user.token = null;
                user.resetPassword = true;
                user.save().then(newPwdUser => {
                    let userInfoJSON = newPwdUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(err => {
                    let error = Boom.badData('修改密码失败,请联系管理员');
                    error.output.payload.code = 1012;
                    error.output.payload.dbError = err;
                    cb(error)
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err);
            } else {
                reply(result);
            }
        })
    },
    // 创建用户(只限制系统管理员)
    create(request, reply) {
        if (request.user.roleType !== role.type.ADMIN) {
            let error = Boom.unauthorized('身份验证失败,您没有权限添加用户')
            error.output.payload.code = 1008;
            reply(error);
            return
        }
        let newUser = {
            username: request.payload.username,
            password: request.payload.password
        }
        User.create(newUser).then(user => {
            let userJSON = user.toJSON();
            delete userJSON.password;
            reply(userJSON);
        }).catch(err => {
            let error = Boom.badData('创建用户失败,请联系管理员');
            error.output.payload.code = 1004;
            error.output.payload.dbError = err;
            debug('group err', err);
            reply(error);
        });
    },
    // 删除用户
    delete(request, reply) {
        db.transaction().then(t => {
            async.waterfall([
                // 验证身份
                (cb) => {
                    debug('delete-currentUser', request.user)
                    if (request.user.roleType === role.type.ADMIN) {
                        cb(null)
                    } else {
                        let error = Boom.unauthorized('身份验证失败,您没有权限删除用户');
                        error.output.payload.code = 1008;
                        cb(error);
                    }
                },
                // 查找用户
                (cb) => {
                    User.findOne({
                        where: {
                            id: request.params.userId
                        }
                    }).then(user => {
                        if (!user) {
                            let error = Boom.badData('用户不存在');
                            error.output.payload.code = 1006;
                            cb(error)
                        } else if (user.username === 'admin') {
                            let error = Boom.badData('不能删除管理员');
                            error.output.payload.code = 1037;
                            cb(error);
                        } else {
                            cb(null, user)
                        };
                    })
                },
                // 删除用户
                (user, cb) => {
                    debug('del user --------', user.roleName, user.roleType)
                    user.destroy({ transaction: t }).then(delUser => {
                        if (delUser) {
                            cb(null, delUser)
                        } else {
                            let error = Boom.badData('删除用户失败，请联系管理员');
                            error.output.payload.code = 1006;
                            cb(error)
                        }
                    })
                },
                // 删除用户对应的角色
                (delUser, cb) => {
                    if (delUser.roleType === role.type.STUDENT) {
                        Student.destroy({
                            where: {
                                id: parseInt(delUser.targetId)
                            },
                            transaction: t
                        }).then(delModel => {
                            cb(null, delUser.toJSON())
                        }).catch(err => {
                            let error = Boom.badData('删除用户失败，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                            cb(error)
                        })
                    } else if (delUser.roleType === role.type.TEACHER) {
                        Teacher.destroy({
                            where: {
                                id: parseInt(delUser.targetId)
                            },
                            transaction: t
                        }).then(delModel => {
                            cb(null, delUser.toJSON())
                        }).catch(err => {
                            let error = Boom.badData('删除用户失败，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                            cb(error)
                        })
                    } else if (delUser.roleType === role.type.ACDEMIC) {
                        AcdemicDean.destroy({
                            where: {
                                id: parseInt(delUser.targetId)
                            },
                            transaction: t
                        }).then(delModel => {
                            cb(null, delUser.toJSON())
                        }).catch(err => {
                            let error = Boom.badData('删除用户失败，请联系管理员');
                            error.output.payload.dbError = err
                            error.output.payload.code = 1006;
                            cb(error)
                        })
                    }
                }
            ], (err, result) => {
                if (err) {
                    debug('删除用户失败,事务回滚', err)
                    t.rollback()
                    reply(err)
                } else {
                    t.commit()
                    reply(result)
                }
            })
        })
    },
    // 重置密码(只限制管理员使用)
    resetPassword(request, reply) {
        async.waterfall([
            // 验证身份
            (cb) => {
                debug('resetPassword-currentUser', request.user)
                if (request.user.roleType === role.type.ADMIN) {
                    cb(null)
                } else {
                    let error = Boom.unauthorized('身份验证失败,您没有权限重置密码');
                    error.output.payload.code = 1008;
                    cb(error);
                }
            },
            // 查询用户
            (cb) => {
                User.findById(request.params.userId).then(user => {
                    if (!user) {
                        let error = Boom.notAcceptable('用户不存在');
                        error.output.payload.code = 1013;
                        cb(error);
                    } else if (user.isDeleted) {
                        let error = Boom.forbidden('用户已被删除，不能重置密码');
                        error.output.payload.code = 1014;
                        cb(error);
                    } else if (user.isDisabled) {
                        let error = Boom.forbidden('用户已被禁用，不能重置密码');
                        error.output.payload.code = 1014;
                        cb(error);
                    } else {
                        cb(null, user)
                    }
                }).catch(err => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1015;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
            },
            (user, cb) => {
                user.password = request.payload.newPassword;
                user.token = null;
                user.resetPassword = true;
                user.save().then(newPwdUser => {
                    // debug(uuu);
                    let userInfoJSON = newPwdUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(err => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1016;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '重置密码发生错误';
                    cb(error);
                });
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        });
    },
    // 禁用用户
    disableUser(request, reply) {
        async.waterfall([
            // 验证身份
            (cb) => {
                debug('disableUser-currentUser', request.user)
                if (request.user.roleType === role.type.ADMIN) {
                    cb(null)
                } else {
                    let error = Boom.unauthorized('身份验证失败,您没有权限');
                    error.output.payload.code = 1008;
                    cb(error);
                }
            },
            (cb) => {
                findOneUser(request.params.userId, cb);
            },
            (user, cb) => {
                if (user.username === 'admin') {
                    let error = Boom.notAcceptable('不能禁用管理员');
                    error.output.payload.code = 1036;
                    cb(error);
                } else if (user.isDisabled) {
                    let error = Boom.notAcceptable('用户已禁用');
                    error.output.payload.code = 1035;
                    cb(error);
                } else {
                    user.isDisabled = true;
                    user.save().then(newUser => {
                        cb(null, newUser);
                    }).catch(err => {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1032;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '禁用用户时发生错误';
                        cb(error);
                    });
                }
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
    // 启用用户
    enableUser(request, reply) {
        async.waterfall([
            // 验证身份
            (cb) => {
                debug('enableUser-currentUser', request.user)
                if (request.user.roleType === role.type.ADMIN) {
                    cb(null)
                } else {
                    let error = Boom.unauthorized('身份验证失败,您没有权限');
                    error.output.payload.code = 1008;
                    cb(error);
                }
            },
            (cb) => {
                findOneUser(request.params.userId, cb);
            },
            (user, cb) => {
                if (!user.isDisabled) {
                    let error = Boom.notAcceptable('用户已启用');
                    error.output.payload.code = 1034;
                    cb(error);
                } else {
                    user.isDisabled = false;
                    user.save().then(function (newUser) {
                        cb(null, newUser);
                    }).catch(function (err) {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1033;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '启用用户时发生错误';
                        cb(error);
                    });
                }
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
    // 查询单个用户
    findOneById(request, reply) {
        async.waterfall([ // 查询用户
            (cb) => {
                User.findOne({
                    where: {
                        id: parseInt(request.params.userId)
                    },
                    attributes: {
                        exclude: ['password']
                    }
                }).then((user) => {
                    if (!user) {
                        let error = Boom.notAcceptable('查询用户数据发生错误, 用户不存在');
                        error.output.payload.code = 1029;
                        cb(error);
                    } else {
                        cb(null, user.toJSON());
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1030;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询样本数据发生错误';
                    cb(error);
                })
            },
            // 获取用户角色基本信息
            (userInfo, cb) => {
                userInfo.baseInfo = {}
                if (!userInfo.targetId) {
                    cb(null, userInfo)
                } else {
                    if (userInfo.roleType === role.type.STUDENT) {
                        // 学生
                        // debug('userInfo.targetId', userInfo.targetId)
                        Student.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(student => {
                            // debug('student--------', student)
                            if (student) {
                                userInfo.baseInfo = student.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            debug(err)
                            cb(null, userInfo)
                        })
                    } else if (userInfo.roleType === role.type.TEACHER) {
                        // 教务员
                        Teacher.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(teacher => {
                            debug('teacher--------', teacher)
                            if (teacher) {
                                userInfo.baseInfo = teacher.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            debug(err)
                            cb(null, userInfo)
                        })
                    } else if (userInfo.roleType === role.type.ACDEMIC) {
                        // 教师
                        AcdemicDean.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(acdemicDean => {
                            debug('AcdemicDean--------', acdemicDean)
                            if (acdemicDean) {
                                userInfo.baseInfo = acdemicDean.toJSON()
                            }
                            cb(null, userInfo)
                        }).catch(err => {
                            debug(err)
                            cb(null, userInfo)
                        })
                    }
                }
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug('getUserInfo', result)
                reply(result)
            }
        });
    }
};

// 查询一个用户
function findOneUser(userId, cb) {
    User.findOne({
        where: {
            id: parseInt(userId)
        },
        attributes: {
            exclude: ['password']
        }
    }).then(user => {
        if (!user) {
            let error = Boom.notAcceptable('查询用户数据发生错误, 用户不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else {
            cb(null, user);
        }
    }).catch(err => {
        let error = Boom.notAcceptable('查询用户出错,请联系管理员');
        error.output.payload.dbError = err
        cb(error);
    })
};

module.exports = userMethods;
