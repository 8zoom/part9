/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const server = express();
server.use(express.json());

server.get("/hello", (_request, response) => {
  response
    .send(
      `<br><h2 style=' font-family:
       "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";' >
       Hello Full Stack!
       <h2>`
    )
    .status(200);
  response.end();
});

server.get("/bmi", (request, response) => {
  const { height, weight } = request.query;
  try {
    const result = calculateBmi(Number(height), Number(weight));
    response.json({
      weight: Number(weight),
      height: Number(height),
      bmi: result,
    });
  } catch (error) {
    response.status(400).json({ error: "malformatted parameters" });
  }
});

server.post("/exercises", (request, response) => {
  try {
    const body: any = request.body;

    const daily_exercises = body.daily_exercises;
    const target = body.target;

    if (!target || ! daily_exercises) { 
      response.status(400).json({ error: "parameters missing" });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    } else if( isNaN(Number(target)) || daily_exercises.map((x: any) => !isNaN(Number(x))).some((x: boolean) => x === false) ){
      response.status(400).json({ error: "malformed parameters" });
    } else {
      const result = calculateExercises(target, daily_exercises );
      response.json(result);
    }
  } catch (error) {
    response.status(400).json({ error: "something went wrong" });
  }
});





const PORT = 3002;

server.listen(PORT, "localhost", () => {
  console.log(`server is running on port ${PORT}`);
});
