import express from "express";
import { calculateBmi } from "./bmiCalculator";

const server = express();

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

const PORT = 3002;

server.listen(PORT, "localhost", () => {
  console.log(`server is running on port ${PORT}`);
});
