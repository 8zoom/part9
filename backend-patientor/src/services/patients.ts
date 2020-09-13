import { v1 as uuid} from 'uuid';
import { Patient, PublicPatient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

import patientData from "../../data/patients";

const getPatients = (): Patient[] => patientData;

const getNonSensitivPatientData = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  }));
};

const findPatientById = (id: string): PublicPatient => {
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
