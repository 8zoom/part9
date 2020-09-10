/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// app.use(function (_req: any, res: any, next: any) {
//   res.set("Access-Control-Allow-Origin", "*");
//   next();
// });

app.get("/api/ping", (_request, response) => {
  response.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
