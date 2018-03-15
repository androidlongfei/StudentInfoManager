'use strict';

/**
 * 连接数据库
 * @type {*|exports|module.exports}
 */

import Sequelize from 'sequelize'
import dbConfig from '../../config/db'
import moment from 'moment'

import createDebug from 'debug'
const debug = createDebug('app:db')

// 增加事务
// import cls from 'continuation-local-storage'
// const namespace = cls.createNamespace('my-very-own-namespace')
// Sequelize.cls = namespace;

// 连接数据库
const dbConn = new Sequelize(dbConfig.MYSQL_DBNAME, dbConfig.MYSQL_USER, dbConfig.MYSQL_PASSWORD, {
    host: dbConfig.MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
        // charset: 'UTF-8'
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00',
    port: dbConfig.MYSQL_PORT,

    // 输出db log.有三种值[false,debug,console.log] false:表示不输出; debug:debug输出; console.log:默认输出
    logging: false,

    define: {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: true,
        // underscored: true,
        underscoredAll: true,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        getterMethods: {
            createdAt: function () {
                return moment(this.dataValues.createdAt).format()
            },
            updatedAt: function () {
                return moment(this.dataValues.updatedAt).format()
            }
        }
    }
});
module.exports = dbConn;
