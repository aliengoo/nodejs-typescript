///<reference path="../typings/tsd.d.ts"/>

import * as express from "express";
import * as bodyParser from "body-parser";
import helloRouter from "./routes/hello-router";
import movieRouter from "./routes/movie-router";
import "./db/connect";

let app: express.Express = express();

app.use(bodyParser.json());

app.use("/api", helloRouter);
app.use("/api", movieRouter);

const PORT: Number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
