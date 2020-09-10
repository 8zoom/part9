import { Diagnosis } from "../types";
import diagnosticData from "../../data/diagnoses";

const getDiagnoses = (): Diagnosis [] => diagnosticData;

export default {
    getDiagnoses 
};