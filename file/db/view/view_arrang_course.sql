DROP VIEW IF EXISTS view_arrang_course;
CREATE VIEW `view_arrang_course` AS
SELECT a.id AS arrang_course_id,a.created_at AS create_time,a.course_name, a.course_credits, a.department,c.name AS class_name,
t.name AS teacher_name,a.professional,a.address,a.time,a.start_time,a.end_time,a.semester
FROM arrang_course AS a, class AS c, teacher as t
WHERE a.class_id = c.id AND a.teacher_id = t.id
