/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
const app = express();
const PORT = 3001;

app.use(function(_req: any, res: any, next: any ) {
    res.set("Access-Control-Allow-Origin", "*");
    next();
  });


app.get("/api/ping", (_request, response) => {
  response.send('pong');
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
