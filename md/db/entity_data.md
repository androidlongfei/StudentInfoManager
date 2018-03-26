# 实体材料

用户:系统管理员，教务员，教师，学生

## 用户表 (user)

- id 用户ID (主键自增)
- user_name 用户名
- real_name
- password 密码
- token 身份验证
- is_disabled 是否能用
- create_at 创建日期
- update_at 更新日期

## 角色表 (role)

- id 角色ID
- role_name 角色的名字 (学生,教师,教务员,系统管理员)
- role_type 角色类型 (学生:1,教师:2,教务员:3,系统管理员:4)
- role_permissions 角色权限
- target_id 目标用户ID
- create_at 创建日期
- update_at 更新日期

## 学生表(student)

学生使用此表进行对各自成绩的查询

教务员使用此表进行学生管理,实现学生的增，删，改，查询.

- id 学生ID (主键自增)
- student_no 学号
- student_name 姓名
- student_gender 性别
- student_birth 生日
- student_tel 电话
- admission_date 入学日期
- class_id 所属班级(外键)
- create_at 创建日期
- update_at 更新日期

## 教师表(teacher)

教务员使用此表进行教师管理,实现教师基本信息的增，删，改，查询.

- id 教师ID
- teacher_no 编号
- teacher_title 职称
- teacher_name 姓名
- teacher_gender 性别
- teacher_birth 生日
- teacher_tel 电话
- create_at 创建日期
- update_at 更新日期

## 教务员表(acdemic_dean)

职责:日常教学工作组织管理、教学秩序管理、教学档案管理

详细:班级管理，学生管理，课程管理，成绩管理

- id
- acd_dean_name 姓名
- acd_dean_gender 性别
- acd_dean_birth 生日
- acd_dean_tel 电话
- create_at 创建日期
- update_at 更新日期

## 课程表(Course)

教师使用此表可以设置教师的授课科目

- id
- course_name 课程名
- total 课程学分

## 班级表(class)

教务员使用此表进行班级管理,实现班级的增，删，改，查询.

- id
- class_name 名字
- class_note 备注
- address 地址(教学楼101室)
- departments 所属院系

# 关系材料

## 排课表(arrang_course)

教务员使用此表安排课程

- id
- course_id 课程id
- class_id 班级id
- teacher_id 教师id
- address 上课地点(教学楼102班,根据班级ID获取班级地址)
- time 上课时间(每周一、三、五第七、八节课)
- start_time 开课时间(2015-07)
- end_time 结课时间(2015-12)
- semester 学期(第一学年上学期)

## 成绩表 (score)

教师使用此表对学生成绩的录入，成绩的查询，成绩的维护

- id
- student_id 学生ID
- arrang_course_id 课程ID
- score 分数
