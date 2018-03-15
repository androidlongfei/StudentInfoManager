# 部署服务

## 一.部署mysql

1.创建数据缓存目录

```shell
sudo mkdir -p /data/gulp_db
```

2.启动Mysql镜像

```shell
docker run \
-v /data/gulp_db:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-e MYSQL_DATABASE=gulp \
-p 3306:3306 \
-d daocloud.io/library/mysql:latest
```

3.设置数据库gulp的编码为utf-8

```shell
ALTER SCHEMA `gulp`  DEFAULT CHARACTER SET utf8  DEFAULT COLLATE utf8_general_ci ;
```

或者用MySQLWorkbench工具修改`utf8_general_ci`
