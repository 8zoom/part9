import express from "express";
import patientServices from "../services/patients";
import { NewEntry } from "../types";
import { toNewPatientEntry, toNewAdmissionEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.json(patientServices.getNonSensitivPatientData());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  res.json(patientServices.findPatientById(id));
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

router.post("/:id/entries", (req, res) => {
  const id: string = req.params.id;
  const patient = patientServices.findPatientById(id);
  if (!patient) {
    res.status(404);
  } else {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const entryParams: NewEntry = toNewAdmissionEntry(req.body);
      const newEntry = patientServices.addEntry(entryParams, id);
      res.json(newEntry);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(e.message);
    }
  }
});

export default router;
