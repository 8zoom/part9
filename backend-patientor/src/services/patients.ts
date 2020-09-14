import { v1 as uuid} from 'uuid';
import { Patient, PublicPatient,  NewPatientEntry } from "../types";

import patientData from "../../data/patients";

const getPatients = (): Patient[] => patientData;

const getNonSensitivPatientData = (): PublicPatient[] => {
  return patientData.map(({ id, ssn, name, dateOfBirth, occupation, gender, entries }) => ({
    id,
    ssn,
    name,
    dateOfBirth,
    occupation,
    gender,
    entries,
  }));
};

const findPatientById = (id: string): Patient => {
  const patient = patientData.filter(p => p.id === id)[0];
  return patient;
}; 

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient = {
    id, ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivPatientData,
  addPatient,
  findPatientById
};
