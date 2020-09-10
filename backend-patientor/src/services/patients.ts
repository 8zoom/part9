import { v1 as uuid} from 'uuid';
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

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
  addPatient
};
