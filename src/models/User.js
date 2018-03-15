'use strict';

/**
 *  用户表
 *  一个用户对应多个角色
 *  一个用户对应多个组
 */

import dbConn from '../lib/db/dbConn'
import moment from 'moment'
import Sequelize from 'sequelize'

const bcrypt = require('bcrypt-nodejs');
const debug = require('debug')('app:models:User');

const User = dbConn.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'user_name'
    },
    realName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'real_name'
    },
    department: {
        type: Sequelize.STRING
    },
    lastLoginDate: {
        type: Sequelize.DATE,
        field: 'last_login_date'
    },
    lastLoginIp: {
        type: Sequelize.STRING,
        field: 'last_login_ip'
    },
    password: {
        type: Sequelize.STRING
    },
    isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_disabled'
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_deleted'
    },
    token: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at'
    }
}, {
    getterMethods: {
        lastLoginDate: function () {
            if (this.dataValues.lastLoginDate) {
                return moment(this.dataValues.lastLoginDate).format();
            } else {
                return this.dataValues.lastLoginDate;
            }
        }
    },
    comment: 'I am a table comment!'
})

let createUserHashPassword = function (user) {
    if (user.password) {
        debug(`创建用户,密码加密:${user.username}`)
        let salt = bcrypt.genSaltSync();
        let cryptedPassword = bcrypt.hashSync(user.password, salt);
        debug(`加密前password:${user.password},加密后cryptedPassword:${cryptedPassword}`)
        user.password = cryptedPassword;
    }
}

let updateUserHashPassword = function (user) {
    debug('更新用户信息:', user.toJSON())
    debug(`是否需要密码加密:${user.resetPassword}`)
    if (user.resetPassword) {
        if (user.password) {
            let salt = bcrypt.genSaltSync()
            let cryptedPassword = bcrypt.hashSync(user.password, salt)
            debug(`更新用户信息,password:${user.password},cryptedPassword:${cryptedPassword}`)
            user.password = cryptedPassword
        }
    }
}

// User.hasMany(RelationUserGroup, { foreignKey: 'userId' });
// User.hasMany(RelationUserRole, { foreignKey: 'userId' });

// 密码加密，修改数据时要特别小心，不要意外修改密码
User.hook('beforeCreate', createUserHashPassword);
User.hook('beforeUpdate', updateUserHashPassword);

module.exports = User;
