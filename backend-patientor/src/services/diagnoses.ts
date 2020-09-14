import { Diagnosis } from "../types";
import diagnosticData from "../../data/diagnoses";

const getDiagnoses = (): Diagnosis [] => diagnosticData;

const getDiagnosisByCode = (code: string ): Diagnosis => {
    const diagnosis = diagnosticData.find(d => d.code === code);
    return diagnosis ? diagnosis : {code, name: "Error: diagnosis code not found" };
};

export default {
    getDiagnoses ,
    getDiagnosisByCode 
};