import express from "express";
import patientServices from "../services/patients";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientServices.getNonSensitivPatientData());
});

router.post("/", (req, res) => {
  try {
    const newPatientParams = toNewPatientEntry(req.body);
    const newPatient = patientServices.addPatient(newPatientParams);

    res.json(newPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
