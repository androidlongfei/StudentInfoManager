DROP VIEW IF EXISTS view_user_role;
CREATE VIEW `view_user_role` AS
select vus.* from view_user_student AS vus
union
select vut.* from view_user_teacher AS vut
union
select vua.* from view_user_acdemic AS vua
