DROP VIEW IF EXISTS view_student_course_score1;
CREATE VIEW `view_student_course_score1` AS
SELECT course.id AS arrang_course_id,course.created_at AS create_time,course.semester,course.course_name,course.department,course.professional,
class.name AS class_name,
teacher.name AS teacher_name,
stu.id AS student_id, stu.student_no, stu.name AS student_name,score.score
FROM student AS stu, class, teacher, score, arrang_course AS course
WHERE course.id = score.arrang_course_id AND stu.id = score.student_id AND course.class_id = class.id AND course.class_id = stu.class_id AND course.teacher_id = teacher.id
