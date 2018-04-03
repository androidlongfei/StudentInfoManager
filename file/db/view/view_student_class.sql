DROP VIEW IF EXISTS view_student_class;
CREATE VIEW `view_student_class` AS
SELECT u.id AS user_id, u.user_name, u.role_type, c.name AS class_name,  c.department AS class_department,
s.id AS student_id,s.id_card_no,s.student_no,s.name AS student_name,s.gender,s.birth,s.telephone,s.admission,s.age,s.professional,s.department AS student_department,
address,s.created_at AS create_time
FROM student AS s, class AS c, user as u
WHERE s.class_id = c.id AND s.id = u.target_id AND u.role_type=1
