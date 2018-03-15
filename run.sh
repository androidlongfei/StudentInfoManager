#!/bin/bash
orginImage="gulp_study:v1"
targetImage="image.micro-helix.com:5000/mh/gulp_study:v1"
echo "开始构建image----"
echo "1.删除已经关闭的image----"
docker rm $(docker ps -a -q)
echo "2.build image----"
docker build -t ${orginImage} .
echo "3.如果目标image存在，则删除----"
docker rmi -f ${targetImage}
echo "4.tag 目标image----"
docker tag ${orginImage} ${targetImage}
echo "5.rmi 原有image----"
docker rmi -f ${orginImage}
echo "构建image结束！"
echo "6.run image----"
docker run -d -p 3800:3800 ${targetImage}
