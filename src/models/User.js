'use strict';

/**
 *  用户表
 *  一个用户对应一个角色
 */

import dbConn from '../lib/db/dbConn'
import moment from 'moment'
import Sequelize from 'sequelize'
import roleConfig from '../config/role'

const bcrypt = require('bcrypt-nodejs');
const debug = require('debug')('app:models:User');

const User = dbConn.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'user_name'
    },
    password: {
        type: Sequelize.STRING
    },
    isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_disabled'
    },
    token: {
        type: Sequelize.TEXT
    },
    roleType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'role_type'
    },
    roleName: {
        type: Sequelize.STRING,
        field: 'role_name'
    },
    targetId: {
        type: Sequelize.INTEGER,
        field: 'target_id'
    },
    lastLoginDate: {
        type: Sequelize.DATE,
        field: 'last_login_date'
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
    // 属性get方法
    getterMethods: {
        lastLoginDate() {
            // console.log('user---', this)
            if (this.dataValues.lastLoginDate) {
                return moment(this.dataValues.lastLoginDate).format();
            } else {
                return '';
            }
        }
    },
    // 属性set方法
    setterMethods: {

    },
    comment: '用户表'
})

let createUserHashPassword = (user) => {
    if (user.password) {
        debug(`创建用户,密码加密:${user.username}`)
        let salt = bcrypt.genSaltSync();
        let cryptedPassword = bcrypt.hashSync(user.password, salt);
        debug(`加密前password:${user.password},加密后cryptedPassword:${cryptedPassword}`)
        user.password = cryptedPassword;
    }
    if (user.roleType) {
        user.roleName = roleConfig.name[user.roleType.toString()]
        // user.roleName = 'system manager'
        console.log('user.roleName', user.roleName)
    }
}

let updateUserHashPassword = (user) => {
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
