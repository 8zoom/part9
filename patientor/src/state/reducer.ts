import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis [];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSES_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (acc, diagnosis) => ({ ...acc, [diagnosis.code]: diagnosis}),
               {}
            ),
            ...state.diagnoses
          }
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      // const old =  state.patients.filter((p: Patient) => p.id !== action.payload.id); 
      console.log(state);
      return {
        ...state,
        patients: {
          ...state.patients,
        }
      };
    
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient []): Action=> ({
    type: "SET_PATIENT_LIST",
    payload: patientList,
});

export const setDiagnosesList = (diagnosesList: Diagnosis []): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload: diagnosesList,
});