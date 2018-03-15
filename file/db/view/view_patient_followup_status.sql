CREATE VIEW `view_patient_followup_status` AS

SELECT max(t_fv.updated_at) as updated_at,
    t_fv.patient_id,
   -- SUBSTRING_INDEX(GROUP_CONCAT(t_fv.updated_at ORDER BY t_fv.updated_at DESC ),',',1) AS updated_at,
    SUBSTRING_INDEX(GROUP_CONCAT(t_fv.value ORDER BY t_fv.updated_at DESC ),',',1) AS followup_status
FROM patient_followup_values AS t_fv, patient_followup_attrs AS t_ca
WHERE t_ca.name = '随访状态' AND  t_ca.id = t_fv.patient_followup_attr_id
GROUP BY t_fv.patient_id
