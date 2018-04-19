DROP VIEW IF EXISTS view_user_student;
CREATE VIEW `view_user_student` AS
SELECT u.id AS user_id,u.created_at AS create_time,u.user_name,u.is_disabled,u.role_name,u.role_type,u.target_id,
s.name AS real_name, s.gender AS gender
FROM user AS u ,student AS s
WHERE u.role_type = 1 AND u.target_id = s.id
