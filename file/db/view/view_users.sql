CREATE VIEW `view_users` AS
SELECT u.id, u.user_name, u.real_name, u.department, u.is_disabled, u.is_deleted, u.created_at, u.updated_at,
u.last_login_date, u.last_login_ip
FROM users AS u
