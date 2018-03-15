# Sequelize 连接数据库

## 一.连接数据库

### 1.相关文档

- [连接数据库](http://docs.sequelizejs.com/en/v3/docs/getting-started/)
- [参数说明](http://sequelize.readthedocs.io/en/latest/api/sequelize/)

### 2.例子

```javascript
import Sequelize from 'sequelize'
const dbConn = new Sequelize(dbConfig.MYSQL_DBNAME, dbConfig.MYSQL_USER, dbConfig.MYSQL_PASSWORD, {
  host: dbConfig.MYSQL_HOST,
  dialect: 'mysql',
  dialectOptions: {
    //charset: 'UTF-8'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00',
  port: dbConfig.MYSQL_PORT,

  define: {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: true,
    // underscored: true,
    underscoredAll: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    getterMethods: {
      createdAt: function() {
        return moment(this.dataValues.createdAt).format()
      },
      updatedAt: function() {
        return moment(this.dataValues.updatedAt).format()
      }
    },
  }
});
```
