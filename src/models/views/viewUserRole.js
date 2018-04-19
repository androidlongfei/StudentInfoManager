'use strict';

/**
 *  用户角色视图
 *
 */

import dbConn from '../../lib/db/dbConn'
import Sequelize from 'sequelize'
import gender from '../../config/gender'

const ViewUserRole = dbConn.define('ViewUserRole', {
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        comment: '用户ID'
    },
    userName: {
        type: Sequelize.STRING,
        field: 'user_name',
        comment: '用户名'
    },
    gender: {
        type: Sequelize.INTEGER
    },
    realName: {
        type: Sequelize.STRING,
        field: 'real_name',
        comment: '姓名'
    },
    roleType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'role_type',
        comment: '角色类型'
    },
    roleName: {
        type: Sequelize.STRING,
        field: 'role_name'
    },
    targetId: {
        type: Sequelize.INTEGER,
        field: 'target_id',
        comment: '角色名字'
    },
    isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_disabled',
        comment: '是否可用'
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        comment: '创建时间'
    }
}, {
    tableName: 'view_user_role',
    // 属性get方法
    getterMethods: {
        genderValue() {
            if (this.gender) {
                // console.log('genderValue', this.dataValues.gender)
                return gender.converTypeToValue(this.dataValues.gender)
            }
        },
        accountStatus() {
            if (this.isDisabled) {
                return '被禁用'
            }
            return '可用'
        }
    },
    // 属性set方法
    setterMethods: {

    },
    createdAt: false,
    updatedAt: false,
    comment: '用户角色视图'
})

module.exports = ViewUserRole
ViewUserRole.removeAttribute('id')
