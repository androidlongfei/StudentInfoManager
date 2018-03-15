/**
 * 数据库配置
 * @type {Object}
 */
module.exports = {
    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PORT: process.env.MYSQL_PORT || '3306',
    MYSQL_DBNAME: process.env.MYSQL_DBNAME || 'student_info_manager',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123456'
};
