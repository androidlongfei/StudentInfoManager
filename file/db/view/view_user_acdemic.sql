DROP VIEW IF EXISTS view_user_acdemic;
CREATE VIEW `view_user_acdemic` AS
SELECT u.id AS user_id,u.created_at AS create_time,u.user_name,u.is_disabled,u.role_name,u.role_type,u.target_id,
a.name AS real_name, a.gender AS gender
FROM user AS u ,acdemic_dean AS a
WHERE u.role_type = 3 AND u.target_id = a.id
