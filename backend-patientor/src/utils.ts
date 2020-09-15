/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {  Gender,  NewPatientEntry, Entry, NewEntry,
   HospitalEntry as HospitalType,
    HealthCheckEntry as HealthCheckType,
     OccupationalHealthcareEntry as OccupationalType, 
     assertNever} from "./types";

export const toNewAdmissionEntry = (object: Entry): NewEntry => {
  switch (object.type) {

    case "Hospital":

      const hospitalEntry: Omit<HospitalType, "id"> = {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes,
        type: "Hospital",
        discharge: {date: object.discharge.date, criteria: object.discharge.criteria},
        };
      return hospitalEntry;

    case "HealthCheck":

      const healthCheckEntry: Omit<HealthCheckType, "id"> = {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes,
        type: "HealthCheck",
        healthCheckRating: object.healthCheckRating
      };
      return healthCheckEntry;

    case "OccupationalHealthcare":

      const occupationalEntry: Omit<OccupationalType, "id"> = {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes,
        type: "OccupationalHealthcare",
        employerName: object.employerName,
      };
      return   occupationalEntry;

    default:
      return assertNever(object);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: [],
        ssn: parseSsn(object.ssn)
    };

    return newPatient;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseSsn = (ssn: any): string => {
      if(!ssn|| !isString(ssn)) {
        throw new Error('Incorrect or missing SSN: ' + ssn);
      }
        return ssn;
  };

  const parseName = (name: any): string => {
      if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
      }
        return name;
  };
  
  const parseOccupation= (occupation: any): string => {
      if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
      }
        return occupation ;
  };
  
  const isGender = (param: any): param is Gender => {
      return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: any): Gender => {
      if(!gender || !isGender(gender)) {
          throw new Error("Incorrect or missing gender: " + gender);
      }
      return gender;
  };

export default toNewPatientEntry;