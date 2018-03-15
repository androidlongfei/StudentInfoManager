
DROP VIEW IF EXISTS view_medical_case_base;

CREATE VIEW `view_medical_case_base` AS

SELECT t_p.id, t_p.patient_no, t_p.case_no, t_p.patient_name, t_p.gender,
    t_p.date_of_birth, t_p.education, t_p.race, t_p.ethnicity,
    t_vpfs.followup_status,
    t_p.created_at, t_p.updated_at

FROM patients AS t_p

LEFT JOIN view_patient_followup_status AS t_vpfs

ON t_p.id = t_vpfs.patient_id;
