DROP VIEW IF EXISTS view_sample_base;
CREATE VIEW `view_sample_base` AS
SELECT id, patient_id , json_extract(qc_report, '$.auditStatus') AS qc_report_status,
    sample_no, sample_type, volume, collect_time, analysis_type,
    json_extract(parameters, '$.sequencingPlatform')  AS sequencing_platform,
    created_at, updated_at

FROM samples;
