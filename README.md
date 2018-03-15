# 学生成绩管理系统

## 项目基本说明

项目框架:**hapi**

数据库:**mysql**

编辑器配置文件:**.editorconfig**

## 启动MySql数据库(需要先安装docker)

第一步:下载mysql镜像

```
docker pull daocloud.io/library/mysql:latest
```

第二步:创建缓存目录

```shell
sudo mkdir /Users/helongfei/docker_mysql_data/student_manager_sys
```

> 将数据持久化到本地

第二步:启动Mysql

```shell
docker run -v /Users/helongfei/docker_mysql_data/student_manager_sys:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=student_info_manager -p 3306:3306 -d daocloud.io/library/mysql:latest
```

> MYSQL_USER:root

> MYSQL_PASSWORD:123456

> MYSQL_PORT:3306

> MYSQL_DATABASE:student_info_manager 数据库名字

> /Users/helongfei/docker_mysql_data/student_manager_sys:主机目录,用来保存docker容器中的数据

## 启动应用

第一步:全局安装gulp

```
npm install -g gulp
```

第二步:启动

```
gulp
```

## 访问api文档

- [StudentManager API Documentation](http://localhost:3800/documentation)

## 项目使用到的第三方库

**log相关**

- [debug](https://github.com/visionmedia/debug)
- [bucker](https://github.com/nlf/bucker)

**api文档**

- [hapi-swagger](https://github.com/glennjones/hapi-swagger)

**数据库**

- [sequelize](https://github.com/sequelize/sequelize)
- [sequelize3英文版](https://sequelize.readthedocs.io/en/v3/)
- [sequelize4英文版](http://docs.sequelizejs.com/)
- [sequelize4中文版](https://github.com/demopark/sequelize-docs-Zh-CN)

**其它**

- [hapi](http://hapijs.com/tutorials)
- [joi](https://github.com/hapijs/joi/blob/v9.0.4/API.md)
