///<reference path="../typings/tsd.d.ts"/>

import * as express from "express";
import * as serveStatic from "serve-static";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as path from "path";

import helloRouter from "./routes/hello-router";
import movieRouter from "./routes/movie-router";
import "./db/connect";

let app: express.Express = express();

// general middleware
app.use(helmet());

app.use(serveStatic(path.join(__dirname, "../public"), {
  "index": ["index.html"]
}));

app.use(bodyParser.json());

// api routes
app.use("/api", helloRouter);
app.use("/api", movieRouter);

// listening...
const PORT: Number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
