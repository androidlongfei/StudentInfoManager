DROP VIEW IF EXISTS view_user_teacher;
CREATE VIEW `view_user_teacher` AS
SELECT u.id AS user_id,u.created_at AS create_time,u.user_name,u.is_disabled,u.role_name,u.role_type,u.target_id,
t.name AS real_name, t.gender AS gender
FROM user AS u ,teacher AS t
WHERE u.role_type = 2 AND u.target_id = t.id
