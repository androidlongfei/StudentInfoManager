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
                    // 验证用户
                    debug(`1.检测用户是否存在===>,用户名:${user.username}`)
                    if (user) {
                        if (user.isDeleted) {
                            let error = Boom.notAcceptable('用户被管理员删除，不能登录');
                            error.output.payload.code = 10001;
                            cb(error);
                        } else if (user.isDisabled) {
                            let error = Boom.notAcceptable('用户被管理员禁用，不能登录');
                            error.output.payload.code = 10001;
                            cb(error);
                        } else {
                            // 进入下一步，验证密码
                            // debug(`用户${user.username}存在`)
                            cb(null, user);
                        }
                    } else {
                        let error = Boom.badData('用户名或密码错误');
                        error.output.payload.code = 10001;
                        cb(error);
                    }
                }).catch((err) => {
                    let error = Boom.badData();
                    error.output.payload.code = 10001;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                })
            },
            // 验证密码
            (user, cb) => {
                debug(`2.验证密码===>用户输入:${password},数据库:${user.password}`)
                bcrypt.compare(password, user.password, (err, isPasswordPassed) => {
                    if (err) {
                        let error = Boom.badData();
                        error.output.payload.code = 10001;
                        error.output.payload.message = '验证密码时出错，请联系管理员';
                        cb(error)
                    } else {
                        if (isPasswordPassed) {
                            debug('验证密码通过')
                            let userInfoJSON = user.toJSON();
                            user.lastLoginDate = new Date();
                            cb(null, userInfoJSON, user);
                        } else {
                            debug('验证密码不通过')
                            let error = Boom.badData('用户名或密码错误');
                            error.output.payload.code = 10001;
                            cb(error);
                        }
                    }
                })
            },
            // 创建token
            (userInfoJSON, userInstance, cb) => {
                debug(`3.给用户创建token===>,用户名:${userInstance.username}`)
                if (userInfoJSON.token) {
                    delete userInfoJSON.token
                }
                let token = jwt.sign(userInfoJSON, setting.SECRET, { expiresIn: setting.TokenExpirationSeconds });
                userInfoJSON.token = token
                userInfoJSON.tokenExpirationAt = moment().add(setting.TokenExpirationSeconds, 's').format();
                // 保存tocken到数据库
                userInstance.token = token
                userInstance.save().then(newUser => {
                    debug(`创建token成功,token:${token}`)
                    cb(null, userInfoJSON)
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
                        debug('userInfo.targetId', userInfo.targetId)
                        Student.findOne({
                            where: {
                                id: parseInt(userInfo.targetId)
                            }
                        }).then(student => {
                            debug('student--------', student)
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
                debug('4.返回用户信息===>', result)
                request.user = result
                reply(result);
            }
        })
    },
    // 更改密码
    changePassword(request, reply) {
        reply('changePassword---------', request.payload);
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
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1010;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
            },
            // 验证旧密码
            (user, cb) => {
                if (bcrypt.compareSync(request.payload.oldPassword, user.password)) {
                    cb(null, user)
                } else {
                    let error = Boom.unauthorized('旧密码不正确');
                    error.output.payload.code = 1011;
                    cb(error);
                }
            },
            // 修改密码
            (user, cb) => {
                debug('修改密码---------')
                user.password = request.payload.newPassword;
                user.token = null;
                user.resetPassword = true;
                user.save().then(newPwdUser => {
                    debug('修改密码成功---------')
                    let userInfoJSON = newPwdUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(err => {
                    // debug('修改密码失败---------')
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1012;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    // cb(error)
                })
            }
        ], (err, result) => {
            debug('修改密码-----------------------返回', result)
            if (err) {
                reply(err);
            } else {
                reply(result);
            }
        })
    },
    // 创建用户(只限制系统管理员)
    create(request, reply) {
        let newUser = {
            username: request.payload.username,
            password: request.payload.password
        }
        User.create(newUser).then(function (user) {
            let userJSON = user.toJSON();
            delete userJSON.password;
            reply(userJSON);
        }).catch(function (err) {
            let error = Boom.notAcceptable('创建用户失败');
            error.output.payload.code = 1004;
            error.output.payload.dbError = err;
            debug('group err', err);
            reply(error);
        });
    },
    // 删除用户
    delete(request, reply) {
        async.waterfall([
            (cb) => {
                User.findOne({
                    where: {
                        id: request.params.userId
                    }
                }).then(user => {
                    if (!user) {
                        let error = Boom.notAcceptable('用户不存在');
                        error.output.payload.code = 1006;
                        cb(error)
                    } else if (user.username === 'admin') {
                        let error = Boom.notAcceptable('不能删除管理员');
                        error.output.payload.code = 1037;
                        cb(error);
                    } else {
                        cb(null, user)
                    };
                })
            },
            (user, cb) => {
                debug('del user --------', user.roleName, user.roleType)
                user.destroy().then(delUser => {
                    if (delUser) {
                        cb(null, delUser)
                    } else {
                        let error = Boom.notAcceptable('删除用户失败');
                        error.output.payload.code = 1006;
                        cb(error)
                    }
                })
            },
            (delUser, cb) => {
                if (delUser.roleType === role.type.STUDENT) {
                    Student.destroy({
                        where: {
                            id: parseInt(delUser.targetId)
                        }
                    }).then(delModel => {
                        cb(null, delUser.toJSON())
                    }).catch(err => {
                        debug(err)
                        cb(null, delUser.toJSON())
                    })
                } else if (delUser.roleType === role.type.TEACHER) {
                    Teacher.destroy({
                        where: {
                            id: parseInt(delUser.targetId)
                        }
                    }).then(delModel => {
                        cb(null, delUser.toJSON())
                    }).catch(err => {
                        debug(err)
                        cb(null, delUser.toJSON())
                    })
                } else if (delUser.roleType === role.type.ACDEMIC) {
                    AcdemicDean.destroy({
                        where: {
                            id: parseInt(delUser.targetId)
                        }
                    }).then(delModel => {
                        cb(null, delUser.toJSON())
                    }).catch(err => {
                        debug(err)
                        cb(null, delUser.toJSON())
                    })
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
    // 更新用户
    updateUser: function (request, reply) {
        async.waterfall([
            function (cb) {
                User.findById(request.params.userId).then(function (user) {
                    if (!user) {
                        let error = Boom.notAcceptable('用户不存在');
                        error.output.payload.code = 1044;
                        cb(error);
                    } else {
                        cb(null, user)
                    }
                }).catch(function (err) {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1045;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
            },
            function (user, cb) {
                if (request.payload.realName) {
                    user.realName = request.payload.realName;
                }
                if (request.payload.department) {
                    user.department = request.payload.department;
                }

                user.resetPassword = false;
                user.save().then(function (newUpdateUser) {
                    // debug(uuu);
                    let userInfoJSON = newUpdateUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(function (err) {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1046;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '更新用户发生错误';
                    cb(error);
                });
            }
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        });
    },
    // 重置密码
    resetPassword(request, reply) {
        async.waterfall([
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
                user.save().then(function (newPwdUser) {
                    // debug(uuu);
                    let userInfoJSON = newPwdUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(function (err) {
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
    disableUser: function (request, reply) {
        async.waterfall([
            function (cb) {
                findOneUser(request.params.userId, cb);
            },
            function (user, cb) {
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
                    user.save().then(function (newUser) {
                        cb(null, newUser);
                    }).catch(function (err) {
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1032;
                        error.output.payload.dbError = err;
                        error.output.payload.message = '禁用用户时发生错误';
                        cb(error);
                    });
                }
            }
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
    // 启用用户
    enableUser: function (request, reply) {
        async.waterfall([
            function (cb) {
                findOneUser(request.params.userId, cb);
            },
            function (user, cb) {
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
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },

    findOneById: function (request, reply) {
        async.waterfall([ // 查询用户
            function (cb) {
                findOneUser(request.params.userId, cb);
            }
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
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
    }).then(function (user) {
        if (!user) {
            let error = Boom.notAcceptable('查询用户数据发生错误, 用户不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else if (user.isDeleted) {
            let error = Boom.notAcceptable('用户数据已被删除');
            error.output.payload.code = 1031;
            cb(error);
        } else {
            cb(null, user);
        }
    }).catch(function (err) {
        debug(3331111, err);
        let error = Boom.badImplementation();
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        error.output.payload.message = '查询样本数据发生错误';
        cb(error);
    })
};

module.exports = userMethods;
