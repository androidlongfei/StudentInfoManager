FROM daocloud.io/library/node

MAINTAINER micro-helix.com

#创建目录
RUN mkdir -p /var/www/master
#copy 第三方软件的加载列表
COPY  package.json /var/www/master/package.json
#安装第三方软件gulp，全局安装
RUN npm install -g gulp
#拷贝项目目录
COPY . /var/www/master

#切换工作目录
WORKDIR /var/www/master

#删除本地依赖包
RUN rm -rf node_modules

#安装第三方软件，局部安装
RUN npm install

# 转化文件
RUN gulp

#导出端口
EXPOSE  3800

ENTRYPOINT ["node", "dist/index.js"]
