'use strict';

const debug = require('debug')('app:controllers:score');
const async = require('async');
// const _ = require('underscore');
const Boom = require('boom');
// const moment = require('moment');

const Score = require('../models/Score');

const scoreMethods = {
    // 创建
    create(request, reply) {
        async.waterfall([
            (cb) => {
                let postParameter = request.payload
                let newModel = {
                    arrangCourseId: postParameter.arrangCourseId,
                    studentId: postParameter.studentId,
                    score: postParameter.score
                }
                Score.create(newModel).then(model => {
                    let modelJSON = model.toJSON();
                    debug('create success', modelJSON);
                    cb(null, modelJSON)
                }).catch(err => {
                    // console.log('err', err);
                    let error = Boom.notAcceptable('创建失败');
                    error.output.payload.code = 1004;
                    error.output.payload.dbError = err;
                    cb(error)
                });
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
    // 删除
    delete(request, reply) {
        async.waterfall([
            // 查询
            (cb) => {
                Score.findOne({
                    where: {
                        id: parseInt(request.params.scoreId)
                    }
                }).then((model) => {
                    // debug('classModel', classModel)
                    if (!model) {
                        let error = Boom.notAcceptable('不存在')
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
                        let error = Boom.notAcceptable('数据不存在')
                        error.output.payload.code = 1031;
                        cb(error);
                    } else {
                        cb(null, targetModel.toJSON())
                    }
                }).catch((err) => {
                    let error = Boom.badImplementation();
                    error.output.payload.code = 1034;
                    error.output.payload.dbError = err;
                    error.output.payload.message = '删除出错';
                    cb(error);
                })
            }
        ], (err, result) => {
            if (err) {
                reply(err)
            } else {
                reply(result)
            }
        })
    },
    // 更新
    update(request, reply) {
        async.waterfall([
                // 1.查询
                (cb) => {
                    Score.findById(request.params.scoreId).then((model) => {
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
                    if (request.payload.score) {
                        targetModel.score = request.payload.score;
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
                    reply(result)
                }
            });
    },
    // 根据学生ID查询学生信息
    findOneById(request, reply) {
        async.waterfall([ // 查询
            (cb) => {
                findOne(request.params.scoreId, cb);
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
};

// 查询一个学生
function findOne(id, cb) {
    Score.findOne({
        where: {
            id: parseInt(id)
        }
    }).then((targetModel) => {
        if (!targetModel) {
            let error = Boom.notAcceptable('不存在');
            error.output.payload.code = 1029;
            cb(error);
        } else {
            cb(null, targetModel.toJSON());
        }
    }).catch((err) => {
        let error = Boom.badImplementation();
        error.output.payload.code = 1030;
        error.output.payload.dbError = err;
        error.output.payload.message = '查询数据发生错误';
        cb(error);
    })
};

module.exports = scoreMethods;
