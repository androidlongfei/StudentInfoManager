CREATE VIEW `view_user_role` AS

SELECT u.id AS user_id, u.user_name, u.real_name, u.is_disabled, r.id AS role_id, r.role_name,  r.privileges,
rur.created_at, rur.updated_at
FROM users AS u, roles AS r, relation_user_role AS rur
WHERE u.id = rur.user_id AND r.id = rur.role_id AND u.is_deleted = false
