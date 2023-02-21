export function getPatientBodyFromCSVRow(row: any): any {
  return {
    ssn: row.patient_ssn,
    firstName: row.patient_firstName,
    lastName: row.patient_lastName,
    Ccountry: row.patient_country,
    address1: row.patient_address1,
    address2: row.patient_address2,
    number1: row.patient_number1,
    number2: row.patient_number2,
    sex: row.patient_sex,
    dob: row.patient_DOB,
    dod: row.patient_DOD,
    email: row.patient_email,
    height: row.patient_height,
    weight: row.patient_weight,
    bloodType: row.patient_bloodType,
    education: row.patient_educationBackground,
    occupation: row.patient_occupation,
    lastObservation: row.observation_id,
    lastMedication: row.medication_id
  };
}

export function getObservationBodyFromCSVRow(row: any): any {
  return {
    id: row.observation_id,
    time: row.observation_time,
    remark: row.observation_remark,
    patientSsn: row.patient_ssn
  };
}

export function getMedicationBodyFromCSVRow(row: any): any {
  return {
    id: row.medication_id,
    name: row.medication_name,
    company: row.medication_company,
    level: row.medication_level,
    remark: row.medication_remark,
    patientSsn: row.patient_ssn
  };
}

export function getHospitalBodyFromCSVRow(row: any): any {
  return {
    id: row.hospital_id,
    name: row.hospital_name,
    address: row.hospital_address,
    number: row.hospital_number,
    email: row.hospital_email,
    patientSsn: row.patient_ssn
  };
}

export function getPractitionerBodyFromCSVRow(row: any): any {
  return {
    id: row.practitioner_id,
    firstName: row.practitioner_firstName,
    lastName: row.practitioner_lastName,
    address1: row.practitioner_address1,
    address2: row.hospital_address,
    number: row.practitioner_address2,
    number1: row.practitioner_number1,
    number2: row.practitioner_number2,
    checkIn: row.practitioner_checkIn,
    checkOut: row.practitioner_checkOut,
    patientSsn: row.patient_ssn
  };
}
