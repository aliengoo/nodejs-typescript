///<reference path="../typings/tsd.d.ts"/>

import * as express from "express";
import helloRouter from "./routes/hello-router";

let app: express.Express = express();

app.use("/api", helloRouter);

const PORT: Number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening.....");
});
