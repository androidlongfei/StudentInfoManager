DROP VIEW IF EXISTS view_student_course_score;
CREATE VIEW `view_student_course_score` AS
SELECT vsc.*,score.score,score.id AS score_id
FROM view_student_course AS vsc LEFT JOIN score ON (vsc.arrang_course_id = score.arrang_course_id AND vsc.student_id=score.student_id)
