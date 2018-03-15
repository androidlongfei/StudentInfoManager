CREATE VIEW `view_batch_experiment` AS
SELECT b.id AS batch_id, b.batch_name, b.is_deleted, b.batch_status, b.created_at, b.updated_at, b.creator_id,
e.id AS experiment_plan_id, e.patient_id, e.app_name, e.examine_schema_name, e.examine_sub_name,
e.experiment_status, e.examine_report, e.created_at AS experiment_created_at, e.updated_at As experiment_updated_at,
p.patient_name, p.gender, p.case_no, p.date_of_brith,
u.real_name AS creator_name
FROM batch As b, experiment_plans AS e, patients AS p, users AS u
where b.id = e.batch_id AND b.creator_id = u.id AND e.patient_id = p.id
