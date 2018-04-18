DROP VIEW IF EXISTS view_student_course_score1;
CREATE VIEW `view_student_course_score1` AS
SELECT course.id AS arrang_course_id,course.created_at AS create_time,course.semester,course.course_name,course.department,course.professional,
class.name AS class_name,
teacher.name AS teacher_name,
stu.id AS student_id, stu.student_no, stu.name AS student_name,
CASE
WHEN score.arrang_course_id = course.id THEN score.score
ELSE null
END AS 'score',
CASE
WHEN score.arrang_course_id = course.id THEN score.id
ELSE null
END AS 'score_id'
FROM student AS stu LEFT JOIN score ON (stu.id = score.student_id),class, teacher, arrang_course AS course
WHERE course.class_id = class.id AND course.class_id = stu.class_id AND course.teacher_id = teacher.id
