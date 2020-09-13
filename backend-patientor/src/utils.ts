/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {  Gender,  NewPatientEntry } from "./types";

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