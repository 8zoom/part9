import express from "express";
import  diagnosisService from '../services/diagnoses';

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnosisService.getDiagnoses());
});

router.get("/:code",(req,res) => {
  const code = req.params.code;
  const diagnosis = diagnosisService.getDiagnosisByCode(code);
  if(diagnosis){
    res.json(diagnosis);
  } else {
    res.status(401);
  }
});
export default router;
