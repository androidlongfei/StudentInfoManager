'use strict';

const debug = require('debug')('app:controllers:user');
const async = require('async');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const Boom = require('boom');
const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const User = require('../models/User');

const setting = require('../config/setting');

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
                            error.output.payload.code = 1007;
                            cb(error);
                        } else if (user.isDisabled) {
                            let error = Boom.notAcceptable('用户被管理员禁用，不能登录');
                            error.output.payload.code = 1007;
                            cb(error);
                        } else {
                            // 进入下一步，验证密码
                            debug(`用户${user.username}存在`)
                            cb(null, user);
                        }
                    } else {
                        let error = Boom.badData('用户名或密码错误');
                        error.output.payload.code = 1002;
                        cb(error);
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1003;
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
                        let error = Boom.badImplementation();
                        error.output.payload.code = 1022;
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
                            error.output.payload.code = 1023;
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
                userInstance.save()
                debug(`创建token成功,token:${token}`)
                cb(null, userInfoJSON);
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                debug(`4.返回用户信息===>,user:${result}`)
                request.token = result;
                request.token.userId = result.id;
                reply(result);
            }
        })
    },

    logout: function () {},

    changePassword: function (request, reply) {
        // reply(request.payload);
        async.waterfall([
            // 验证身份
            function (cb) {
                if (request.params.userId === request.token.id) {
                    cb(null)
                } else {
                    let error = Boom.unauthorized('身份验证失败，不能修改密码');
                    error.output.payload.code = 1008;
                    cb(error);
                }
            },
            // 查询用户
            function (cb) {
                User.findById(request.token.id).then(function (user) {
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
                }).catch(function (err) {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1010;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
            },
            // 验证旧密码
            function (user, cb) {
                if (bcrypt.compareSync(request.payload.oldPassword, user.password)) {
                    cb(null, user)
                } else {
                    let error = Boom.unauthorized('旧密码不正确');
                    error.output.payload.code = 1011;
                    cb(error);
                }
            },
            // 修改密码
            function (user, cb) {
                user.password = request.payload.newPassword;
                user.token = null;
                user.save().then(function (newPwdUser) {
                    // debug(uuu);
                    let userInfoJSON = newPwdUser.toJSON();
                    delete userInfoJSON.password;
                    cb(null, userInfoJSON);
                }).catch(function (err) {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1012;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
                // cb(null);
            }
        ], function (err, result) {
            if (err) {
                reply(err);
            } else {
                reply(result);
            }
        })
    },

    create: function (request, reply) {
        let newUser = {
            username: request.payload.username,
            realName: request.payload.realName,
            department: request.payload.department,
            password: request.payload.password
        }
        User.create(newUser).then(function (user) {
            let userJSON = user.toJSON();
            delete userJSON.password;
            reply(userJSON);
            // console.log('done');
            // console.log('user', user);
        }).catch(function (err) {
            // console.log('err', err);
            let error = Boom.notAcceptable('创建用户失败');
            error.output.payload.code = 1004;
            error.output.payload.dbError = err;
            debug('group err', err);
            reply(error);
        });
    },

    deleteUser: function (request, reply) {
        async.waterfall([
            function (cb) {
                User.findOne({
                    where: {
                        id: request.params.userId
                    },
                    attributes: [
                        'id',
                        'username',
                        'realName',
                        'isDeleted',
                        'updatedAt',
                        'createdAt'
                    ]
                }).then(function (user) {
                    debug(user);
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
            // // 检查分组
            // function(user, cb) {
            //     RelationUserGroup.findAll({ where: { userId: user.userId } }).then(function(relationsGroup) {
            //         if (relationsGroup.length > 0) {
            //             let error = Boom.notAcceptable('用户仍在分组中，不能删除');
            //             error.output.payload.code = 1017;
            //             cb(error);
            //         } else {
            //             cb(null, user);
            //         }

            //     }).catch(function(err) {
            //         let error = Boom.badImplementation();
            //         error.output.payload.code = 1018;
            //         error.output.payload.dbError = err;
            //         error.output.payload.message = '查询数据发生错误';
            //         cb(error);
            //     });
            // },
            // 检查角色
            // function(user, cb) {
            //     RelationUserRole.findAll({ where: { userId: user.userId } }).then(function(relationsRole) {
            //         if (relationsRole.length > 0) {
            //             let error = Boom.notAcceptable('用户仍存在角色，不能删除');
            //             error.output.payload.code = 1019;
            //             cb(error);
            //         } else {
            //             cb(null, user);
            //         }

            //     }).catch(function(err) {
            //         let error = Boom.badImplementation();
            //         error.output.payload.code = 1020;
            //         error.output.payload.dbError = err;
            //         error.output.payload.message = '查询数据发生错误';
            //         cb(error);
            //     });
            // },
            function (user, cb) {
                user.isDeleted = true;
                user.save().then(function (deletedUser) {
                    cb(null, deletedUser.toJSON());
                });
            }
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
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
    resetPassword: function (request, reply) {
        async.waterfall([
            // 查询用户
            function (cb) {
                User.findById(request.params.userId).then(function (user) {
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
                }).catch(function (err) {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1015;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '查询数据发生错误';
                    cb(error);
                });
            },
            function (user, cb) {
                user.password = request.payload.newPassword;
                user.token = null;
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
        ], function (err, result) {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        });
    },

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
    },
    userFindAll: function (request, reply) {
        let filter = request.query.filter;
        debug(filter);
        if (filter) {
            filter.attributes = {
                exclude: ['password']
            };
        } else {
            filter = {
                attributes: {
                    exclude: ['password']
                }
            };
        }
        User.findAll(filter).then(function (users) {
            reply(users);
        }).catch(function (err) {
            let error = Boom.badImplementation();
            error.output.payload.code = 7001;
            error.output.payload.dbError = err;
            error.output.payload.message = '查询数据发生错误';
            reply(error);
        })
    },
    userCount: function (request, reply) {
        let filter = request.query.filter;
        debug(filter);
        User.count(filter).then(function (usersCount) {
            reply({ count: usersCount });
        }).catch(function (err) {
            let error = Boom.badImplementation();
            error.output.payload.code = 7002;
            error.output.payload.dbError = err;
            error.output.payload.message = '查询数据发生错误';
            reply(error);
        })
    },

    userIsExist: function (request, reply) {
        let filter = request.query.filter;
        User.findOne(filter).then(function (user) {
            if (user) {
                reply({ exist: true });
            } else {
                reply({ exist: false });
            }
        }).catch(function (err) {
            let error = Boom.badImplementation();
            error.output.payload.code = 7001;
            error.output.payload.dbError = err;
            error.output.payload.message = '查询数据发生错误';
            reply(error);
        })
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
