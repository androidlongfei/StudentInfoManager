CREATE VIEW `view_experiment_sample` AS
SELECT e.id AS experiment_plan_id, e.app_name, e.examine_schema_name, e.examine_sub_name, e.creator_id,
e.experiment_status, e.examine_report,e.is_deleted, e.batch_id, e.created_at, e.updated_at,
p.id AS patient_id, p.patient_name, p.gender, p.case_no, p.date_of_brith,
u.real_name AS creator_name,
s.id AS sample_id, s.sample_name, s.collect_time, s.purity_report, s.lib_report, s.qc_report,
s.target_region_file, s.sequence_files, s.analyse_status, s.progress,
s.created_at AS sample_created_at, s.updated_at AS sample_updated_at
FROM experiment_plans AS e, samples AS s, patients AS p, users AS u
where e.creator_id = u.id AND e.patient_id = p.id AND e.id = s.experiment_plan_id
