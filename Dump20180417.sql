-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: student_info_manager
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acdemic_dean`
--

DROP TABLE IF EXISTS `acdemic_dean`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acdemic_dean` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card_no` int(11) NOT NULL,
  `acdemic_dean_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_card_no` (`id_card_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='教务员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acdemic_dean`
--

LOCK TABLES `acdemic_dean` WRITE;
/*!40000 ALTER TABLE `acdemic_dean` DISABLE KEYS */;
INSERT INTO `acdemic_dean` VALUES (2,300001,'A2','王五1',2,'1992-10-01 08:00:00','13666325849','计算机学院','2018-03-23 15:45:01','2018-03-23 15:45:01');
/*!40000 ALTER TABLE `acdemic_dean` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrang_course`
--

DROP TABLE IF EXISTS `arrang_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arrang_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `course_credits` int(11) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `professional` varchar(255) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `time` json DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='排课表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrang_course`
--

LOCK TABLES `arrang_course` WRITE;
/*!40000 ALTER TABLE `arrang_course` DISABLE KEYS */;
INSERT INTO `arrang_course` VALUES (2,'离散数学',10,'计算机学院','计算机科学技术',2,15,'教学楼201室','[\"2018-04-10T22:30:16.000Z\", \"2018-04-11T09:30:16.000Z\"]','2018-04-11 00:00:00','2018-06-11 00:00:00','2016上学期','2018-04-11 16:30:22','2018-04-11 16:30:22'),(3,'有机化学',10,'生物与医学工程学院','生物技术',5,11,'教学楼202室','[\"2018-01-01T01:03:57.000Z\", \"2018-01-01T03:03:57.000Z\"]','2018-03-01 00:00:00','2018-07-01 00:00:00','2016上学期','2018-04-11 17:04:08','2018-04-11 17:04:08'),(5,'数字电路',6,'计算机学院','电子工程',4,5,'教学楼201室','[\"2018-04-11T01:10:45.000Z\", \"2018-04-11T03:18:45.000Z\"]','2018-03-01 00:00:00','2018-05-01 00:00:00','2016下学期','2018-04-11 18:18:48','2018-04-12 16:08:58'),(6,'编译方法',10,'计算机学院','计算机科学技术',2,1,'教学楼201室','[\"2018-04-12T08:10:22.000Z\", \"2018-04-12T09:10:22.000Z\"]','2018-04-05 00:00:00','2018-06-29 00:00:00','2016上学期','2018-04-12 16:10:25','2018-04-12 16:10:25');
/*!40000 ALTER TABLE `arrang_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='班级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'计算机18100',' 计算机学院新生班','计算机学院','2018-03-30 16:24:11','2018-03-30 16:24:11'),(2,'计算机18101','18101班','计算机学院','2018-03-30 16:24:53','2018-03-30 16:24:53'),(3,'电子工程18102','电子工程专业','计算机学院','2018-03-30 16:26:40','2018-03-30 16:26:40'),(4,'电子工程18103','电子工程','计算机学院','2018-03-30 16:27:23','2018-03-30 16:27:23'),(5,'生物技术18104','生物与医学工程学院','生物与医学工程学院','2018-03-30 16:29:04','2018-03-30 16:29:04'),(6,'生物技术10805','生物工程','生物与医学工程学院','2018-03-30 16:29:59','2018-03-30 16:29:59');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `credits` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='班级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'离散数学',8,'2018-03-23 17:35:02','2018-03-23 17:45:22'),(3,'编译方法',6,'2018-03-23 17:44:53','2018-03-23 17:44:53');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `arrang_course_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='成绩表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,2,2,80,'2018-04-13 11:08:12','2018-04-13 11:08:12'),(3,6,5,95,'2018-04-17 13:58:30','2018-04-17 13:58:30');
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card_no` varchar(255) NOT NULL,
  `student_no` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `gender` int(11) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `admission` datetime DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `professional` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `address` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_card_no` (`id_card_no`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='学生表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (2,'429006198010011216',201800002,'李松',1,'2018-04-02 00:00:00','18600900941','2018-04-01 00:00:00',2,35,'计算机科学技术','计算机学院','\"北京市西城区\"','2018-04-02 14:11:35','2018-04-02 14:11:35'),(4,'429006199010011216',201800004,'刘二',1,'2018-01-02 00:00:00','18600900987','2018-01-03 00:00:00',4,28,'电子工程','计算机学院','\"北京大新区\"','2018-04-02 14:34:17','2018-04-02 14:34:17'),(5,'429006198010011215',201800005,'张楠',1,'2018-04-03 00:00:00','18610011002','2018-04-04 00:00:00',2,37,'计算机科学技术','计算机学院','\"D大调\"','2018-04-02 16:54:24','2018-04-03 12:56:07'),(8,'429006198810011225',201800008,'李云',1,'1988-10-01 00:00:00','18600900941','2018-04-01 00:00:00',4,29,'电子工程','计算机学院','\"12345\"','2018-04-02 17:22:19','2018-04-04 10:39:36'),(9,'429006198503011226',201800009,'张扬',2,'1985-03-01 00:00:00','18600900987','2017-11-01 00:00:00',2,33,'计算机科学技术','计算机学院','\"123\"','2018-04-02 17:34:10','2018-04-04 10:39:27'),(10,'428006198711011225',201800010,'王璐',2,'1987-11-01 00:00:00','18600900541','2017-07-05 00:00:00',3,30,'电子工程','计算机学院','\"北京市海淀区\"','2018-04-03 14:13:01','2018-04-03 14:39:42'),(11,'429007199302071225',201800011,'王源',2,'1993-02-07 00:00:00','18600900876','2018-04-02 00:00:00',2,24,'计算机科学技术','计算机学院','\"买买买dddd\"','2018-04-03 14:19:17','2018-04-03 15:09:51'),(13,'429005198010011216',201800013,'李静',1,'1980-10-01 00:00:00','18600900871','2017-11-01 00:00:00',6,37,'生物技术','生物与医学工程学院','\"北京市\"','2018-04-03 15:47:03','2018-04-03 15:47:03'),(14,'429006199010011016',201800014,'李国',1,'1990-10-01 00:00:00','13512674780','2015-07-01 08:00:00',2,27,'计算机科学技术','计算机学院','\"北京市\"','2018-04-04 10:43:59','2018-04-04 10:43:59'),(15,'429006199110111016',201800015,'李华',1,'1991-10-11 08:00:00','13512674780','2015-07-01 08:00:00',6,26,'生物技术','生物与医学工程学院','\"北京市\"','2018-04-04 10:44:41','2018-04-04 10:44:41'),(16,'429006199311011026',201800016,'李爱',2,'1993-11-01 00:00:00','13512674780','2015-07-01 08:00:00',5,24,'生物技术','生物与医学工程学院','\"北京市\"','2018-04-04 10:45:28','2018-04-04 10:45:28');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card_no` varchar(255) NOT NULL,
  `teacher_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `address` json DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_card_no` (`id_card_no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='教师表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'439006197010011200','T1','王权','一级教师',47,1,'1970-10-01 00:00:00','13512674780','计算机学院','\"北京市\"','2018-04-03 18:31:43','2018-04-03 18:31:43'),(2,'439006197110011200','T2','王玉溪','高级教师',46,2,'1971-10-01 00:00:00','13512674780','计算机学院','\"北京市西城区\"','2018-04-04 10:24:02','2018-04-04 10:24:02'),(3,'439006197210011200','T3','李冰','高级教师',45,1,'1972-10-01 00:00:00','13512674781','生物与医学工程学院','\"北京市\"','2018-04-04 10:25:52','2018-04-04 10:25:52'),(4,'439006197311011200','T4',' 李翔','二级教师',44,1,'1973-11-01 00:00:00','13512674784','生物与医学工程学院','\"北京市西城区\"','2018-04-04 10:28:13','2018-04-04 10:28:13'),(5,'439006197509011200','T5','张珊','二级教师',42,1,'1975-09-01 00:00:00','13512675780','计算机学院','\"北京市\"','2018-04-04 10:29:33','2018-04-04 10:29:33'),(6,'439006197511011200','T6','何琪','二级教师',42,1,'1975-11-01 00:00:00','13512674786','生物与医学工程学院','\"北京市\"','2018-04-04 10:30:58','2018-04-04 10:30:58'),(7,'439006197810011200','T7','王丽','三级教师',39,1,'1978-10-01 00:00:00','13512674782','生物与医学工程学院','\"北京市\"','2018-04-04 10:32:36','2018-04-04 10:32:36'),(8,'439006196611011211','T8','李雄','正高级教师',51,1,'1966-11-01 00:00:00','13512674784','计算机学院','\"北京市\"','2018-04-04 10:35:33','2018-04-04 12:23:22'),(9,'439006197710011200','T9','徐佳','一级教师',40,2,'1977-10-01 00:00:00','13512674786','生物与医学工程学院','\"北京市\"','2018-04-04 10:37:32','2018-04-04 10:37:32'),(11,'439006197510011200','T11','李佳怡','一级教师',42,2,'1975-10-01 00:00:00','13512674980','生物与医学工程学院','\"北京市\"','2018-04-04 10:47:50','2018-04-04 10:47:50'),(15,'439006197810011216','T15','李兴','一级教师',39,1,'1978-10-01 00:00:00','13512674784','计算机学院','\"北京市\"','2018-04-04 13:55:57','2018-04-04 13:55:57');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_disabled` tinyint(1) DEFAULT '0',
  `token` text,
  `role_type` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','$2a$10$Kn3FE9dejQ9oTx296SivK.v.y1NfBfRe4iDLyyI6X8iVU0eHrzj0a',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTAzLTIyVDExOjAzOjQxKzA4OjAwIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0xMlQxNjoxNzo0MyswODowMCIsImxhc3RMb2dpbkRhdGUiOiIyMDE4LTA0LTEyVDE2OjE3OjQzKzA4OjAwIiwiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYSQxMCRLbjNGRTlkZWpROW9UeDI5NlNpdksudi55MU5mQmZSZTRpREx5eUk2WDhpVlUwZUhyemowYSIsImlzRGlzYWJsZWQiOmZhbHNlLCJyb2xlVHlwZSI6NCwicm9sZU5hbWUiOiLns7vnu5_nrqHnkIblkZgiLCJ0YXJnZXRJZCI6bnVsbCwiaWF0IjoxNTIzNTIxMzk4LCJleHAiOjE1MzMxMTE3OTh9.X3OaE4kdNe1rA8zLR4xvujzUTQDNks4Pujn9Jf55g-Y',4,'系统管理员',NULL,'2018-04-12 16:23:18','2018-03-22 11:03:41','2018-04-12 16:23:18'),(15,'200002','$2a$10$vggZiu4K7CKNt45n52KcouwHaf8xXcfsoYc6bNCbahA1DpUuqYO6W',0,NULL,2,'教师',2,NULL,'2018-03-23 14:35:20','2018-03-23 14:35:20'),(17,'300001','$2a$10$78VeUjTCQrGbMvAg4eUlUOseEGOlc9Rl08lIh6yweHVyKKwYL7Vb2',0,NULL,3,'教务员',2,NULL,'2018-03-23 15:45:01','2018-03-23 15:45:01'),(21,'429006198010011216','$2a$10$kgRcOQlUtdLq1GvD2ymxBeIasvgWxFmYAV3yJJARVal7ttXWZpqre',0,NULL,1,'学生',2,NULL,'2018-04-02 14:11:35','2018-04-02 14:11:35'),(23,'429006199010011216','$2a$10$ltGzchlaVUrAc4iZLXQOe.VaG1M/gLpafsjEeZ.MZqLTb8hA5NOd2',0,NULL,1,'学生',4,NULL,'2018-04-02 14:34:17','2018-04-02 14:34:17'),(24,'429006198010011215','$2a$10$W5u1P/sRT78OjFsfId1ljuT7PAD/Hg1B8sjJXli2qsKXwQWmJhDPO',0,NULL,1,'学生',5,NULL,'2018-04-02 16:54:24','2018-04-03 12:56:07'),(25,'429006198810011225','$2a$10$1Qls7rU0gSGTjAHGuh4iZOyr6/fdKNYS5tnUiVVs1G/UJaOHPT0nK',0,NULL,1,'学生',8,NULL,'2018-04-02 17:22:19','2018-04-03 13:44:39'),(26,'429006198503011226','$2a$10$bYHN46.6em3O38/3KH7JeOVzwDSwU7qOjYpcCP14251QHMP2m73Ye',0,NULL,1,'学生',9,NULL,'2018-04-02 17:34:10','2018-04-03 14:09:05'),(28,'429007199302071225','$2a$10$8yu.Thp63JssTeFty26fdeh7ZhkMoGgaHTkBFi.pE/SybRI.V/tPK',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDE4LTA0LTAzVDE0OjE5OjE3KzA4OjAwIiwidXBkYXRlZEF0IjoiMjAxOC0wNC0wM1QxNDo1ODoxMyswODowMCIsImxhc3RMb2dpbkRhdGUiOiIyMDE4LTA0LTAzVDE0OjUzOjMzKzA4OjAwIiwiaWQiOjI4LCJ1c2VybmFtZSI6IjQyOTAwNzE5OTMwMjA3MTIyNSIsInBhc3N3b3JkIjoiJDJhJDEwJDh5dS5UaHA2M0pzc1RlRnR5MjZmZGVoN1poa01vR2dhSFRrQkZpLnBFL1N5YlJJLlYvdFBLIiwiaXNEaXNhYmxlZCI6ZmFsc2UsInRva2VuIjpudWxsLCJyb2xlVHlwZSI6MSwicm9sZU5hbWUiOiLlrabnlJ8iLCJ0YXJnZXRJZCI6MTEsImlhdCI6MTUyMjczODcxNCwiZXhwIjoxNTMyMzI5MTE0fQ.wNXOmVUw5WAWDDeu-jvy_gIV2RJ0fPVCdqKvOW3mNhQ',1,'学生',11,'2018-04-03 14:58:34','2018-04-03 14:19:17','2018-04-03 14:58:34'),(30,'439006197010011200','$2a$10$d10Lah88P8kEDjWMcuTYZeqaWDhK94pjDveo1jHjic9MRMZOCswse',0,NULL,2,'教师',1,NULL,'2018-04-03 18:31:43','2018-04-03 18:31:43'),(31,'439006197110011200','$2a$10$.PsxPfQ0AXdhRZOx4G/mxObtz5lq28.67qtqfGwHKZdG52ms7Kx4K',0,NULL,2,'教师',2,NULL,'2018-04-04 10:24:02','2018-04-04 10:24:02'),(32,'439006197210011200','$2a$10$arFhwdfv9v8Q2Q5gUb4ld.fLMrmILBfkVuuZvyOtfqnAgUX6Yr22a',0,NULL,2,'教师',3,NULL,'2018-04-04 10:25:52','2018-04-04 10:25:52'),(33,'439006197311011200','$2a$10$KPg5rjPZZoHX36aku/aofeFy.tpIjG5nzMQFiXvu/bw9nwNQB.0GO',0,NULL,2,'教师',4,NULL,'2018-04-04 10:28:13','2018-04-04 10:28:13'),(34,'439006197509011200','$2a$10$rr5D2QvsP5gPJaVYFDez1.Hv/zxyljn3kOvi8ravsJyY367Y4dbLK',0,NULL,2,'教师',5,NULL,'2018-04-04 10:29:33','2018-04-04 10:29:33'),(35,'439006197511011200','$2a$10$Nz33QTGmwMZ6cyQNoUayWeZXye3bSa0wL8.Ayz3nVwBB8RJOOAIl6',0,NULL,2,'教师',6,NULL,'2018-04-04 10:30:58','2018-04-04 10:30:58'),(36,'439006197810011200','$2a$10$PgK4efTQj15QUGI7Srx8Du9PV.ZoEqdjK4qgnnVuyYOaT191LdyG2',0,NULL,2,'教师',7,NULL,'2018-04-04 10:32:36','2018-04-04 10:32:36'),(37,'439006196611011211','$2a$10$QjA30N.HP0QLY.H4IqmqS.KSbhAsWf.16kmzDNrSS2h581JK68vX2',0,NULL,2,'教师',8,NULL,'2018-04-04 10:35:33','2018-04-04 12:23:22'),(38,'439006197710011200','$2a$10$xNNd99.5c3KoQJWG3niTNeMPju8ZtmM6hOC9gGek2VmCyzlfc2GOa',0,NULL,2,'教师',9,NULL,'2018-04-04 10:37:32','2018-04-04 10:37:32'),(41,'429006199110111016','$2a$10$0rwlfjl5pDyQmSyp3JCabe05XWwCUhR7Iqmkm2T2TAgeTKwtRJlJ6',0,NULL,1,'学生',15,NULL,'2018-04-04 10:44:41','2018-04-04 10:44:41'),(42,'429006199311011026','$2a$10$BE2ClIz5DLnQLygWsa51z.wcvh3Fx7i3hDf/HxgV99d.IdYvtoJTO',0,NULL,1,'学生',16,NULL,'2018-04-04 10:45:28','2018-04-04 10:45:28'),(43,'439006197510011200','$2a$10$5jfbJIq6a22bfmAgmxbNNORS9FuHiTq9XQV954mYkzpn2VWVR6PGa',0,NULL,2,'教师',11,NULL,'2018-04-04 10:47:50','2018-04-04 10:47:50'),(46,'439006197810011216','$2a$10$Ync39bxjaCmXr2OAeeg1Wev0jqNa7nMZPXMWT6G1XKZ6YgXrlkfie',0,NULL,2,'教师',15,NULL,'2018-04-04 13:55:57','2018-04-04 13:55:57');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_arrang_course`
--

DROP TABLE IF EXISTS `view_arrang_course`;
/*!50001 DROP VIEW IF EXISTS `view_arrang_course`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_arrang_course` AS SELECT 
 1 AS `arrang_course_id`,
 1 AS `create_time`,
 1 AS `course_name`,
 1 AS `course_credits`,
 1 AS `department`,
 1 AS `class_name`,
 1 AS `teacher_name`,
 1 AS `professional`,
 1 AS `address`,
 1 AS `time`,
 1 AS `start_time`,
 1 AS `end_time`,
 1 AS `semester`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_student_class`
--

DROP TABLE IF EXISTS `view_student_class`;
/*!50001 DROP VIEW IF EXISTS `view_student_class`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_student_class` AS SELECT 
 1 AS `user_id`,
 1 AS `user_name`,
 1 AS `role_type`,
 1 AS `class_name`,
 1 AS `class_department`,
 1 AS `student_id`,
 1 AS `id_card_no`,
 1 AS `student_no`,
 1 AS `student_name`,
 1 AS `gender`,
 1 AS `birth`,
 1 AS `telephone`,
 1 AS `admission`,
 1 AS `age`,
 1 AS `professional`,
 1 AS `student_department`,
 1 AS `address`,
 1 AS `create_time`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_student_course_score`
--

DROP TABLE IF EXISTS `view_student_course_score`;
/*!50001 DROP VIEW IF EXISTS `view_student_course_score`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_student_course_score` AS SELECT 
 1 AS `arrang_course_id`,
 1 AS `create_time`,
 1 AS `semester`,
 1 AS `course_name`,
 1 AS `department`,
 1 AS `professional`,
 1 AS `class_name`,
 1 AS `teacher_name`,
 1 AS `student_id`,
 1 AS `student_no`,
 1 AS `student_name`,
 1 AS `score`,
 1 AS `score_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_student_course_score1`
--

DROP TABLE IF EXISTS `view_student_course_score1`;
/*!50001 DROP VIEW IF EXISTS `view_student_course_score1`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_student_course_score1` AS SELECT 
 1 AS `arrang_course_id`,
 1 AS `create_time`,
 1 AS `semester`,
 1 AS `course_name`,
 1 AS `department`,
 1 AS `professional`,
 1 AS `class_name`,
 1 AS `teacher_name`,
 1 AS `student_id`,
 1 AS `student_no`,
 1 AS `student_name`,
 1 AS `score`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_arrang_course`
--

/*!50001 DROP VIEW IF EXISTS `view_arrang_course`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_arrang_course` AS select `a`.`id` AS `arrang_course_id`,`a`.`created_at` AS `create_time`,`a`.`course_name` AS `course_name`,`a`.`course_credits` AS `course_credits`,`a`.`department` AS `department`,`c`.`name` AS `class_name`,`t`.`name` AS `teacher_name`,`a`.`professional` AS `professional`,`a`.`address` AS `address`,`a`.`time` AS `time`,`a`.`start_time` AS `start_time`,`a`.`end_time` AS `end_time`,`a`.`semester` AS `semester` from ((`arrang_course` `a` join `class` `c`) join `teacher` `t`) where ((`a`.`class_id` = `c`.`id`) and (`a`.`teacher_id` = `t`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_student_class`
--

/*!50001 DROP VIEW IF EXISTS `view_student_class`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_student_class` AS select `u`.`id` AS `user_id`,`u`.`user_name` AS `user_name`,`u`.`role_type` AS `role_type`,`c`.`name` AS `class_name`,`c`.`department` AS `class_department`,`s`.`id` AS `student_id`,`s`.`id_card_no` AS `id_card_no`,`s`.`student_no` AS `student_no`,`s`.`name` AS `student_name`,`s`.`gender` AS `gender`,`s`.`birth` AS `birth`,`s`.`telephone` AS `telephone`,`s`.`admission` AS `admission`,`s`.`age` AS `age`,`s`.`professional` AS `professional`,`s`.`department` AS `student_department`,`s`.`address` AS `address`,`s`.`created_at` AS `create_time` from ((`student` `s` join `class` `c`) join `user` `u`) where ((`s`.`class_id` = `c`.`id`) and (`s`.`id` = `u`.`target_id`) and (`u`.`role_type` = 1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_student_course_score`
--

/*!50001 DROP VIEW IF EXISTS `view_student_course_score`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_student_course_score` AS select `course`.`id` AS `arrang_course_id`,`course`.`created_at` AS `create_time`,`course`.`semester` AS `semester`,`course`.`course_name` AS `course_name`,`course`.`department` AS `department`,`course`.`professional` AS `professional`,`class`.`name` AS `class_name`,`teacher`.`name` AS `teacher_name`,`stu`.`id` AS `student_id`,`stu`.`student_no` AS `student_no`,`stu`.`name` AS `student_name`,(case when (`score`.`arrang_course_id` = `course`.`id`) then `score`.`score` else 0 end) AS `score`,(case when (`score`.`arrang_course_id` = `course`.`id`) then `score`.`id` else NULL end) AS `score_id` from ((((`student` `stu` left join `score` on((`stu`.`id` = `score`.`student_id`))) join `class`) join `teacher`) join `arrang_course` `course`) where ((`course`.`class_id` = `class`.`id`) and (`class`.`id` = `stu`.`class_id`) and (`course`.`teacher_id` = `teacher`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_student_course_score1`
--

/*!50001 DROP VIEW IF EXISTS `view_student_course_score1`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_student_course_score1` AS select `course`.`id` AS `arrang_course_id`,`course`.`created_at` AS `create_time`,`course`.`semester` AS `semester`,`course`.`course_name` AS `course_name`,`course`.`department` AS `department`,`course`.`professional` AS `professional`,`class`.`name` AS `class_name`,`teacher`.`name` AS `teacher_name`,`stu`.`id` AS `student_id`,`stu`.`student_no` AS `student_no`,`stu`.`name` AS `student_name`,`score`.`score` AS `score` from ((((`student` `stu` join `class`) join `teacher`) join `score`) join `arrang_course` `course`) where ((`course`.`id` = `score`.`arrang_course_id`) and (`stu`.`id` = `score`.`student_id`) and (`course`.`class_id` = `class`.`id`) and (`course`.`class_id` = `stu`.`class_id`) and (`course`.`teacher_id` = `teacher`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-17 16:48:21
