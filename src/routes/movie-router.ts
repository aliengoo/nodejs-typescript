"use strict";

import * as express from "express";
import Movie, {IMovieModel} from "../db/models/Movie";
import {Query} from "mongoose";

let router: express.Router = express.Router();

/**
 * Gets the movie base on the ID
 * @param req
 * @param res
 */
let getMovieById: express.RequestHandler = (req: express.Request, res: express.Response): void => {
  let query: Query<IMovieModel> = Movie.findById(req.params.id);

  query.exec().then((movie?: IMovieModel) => {
    if (movie) {
      res.send(movie);
    } else {
      res.sendStatus(404);
    }
  });
};

router.get("/movie/:id", getMovieById);

/**
 * Deletes a movie
 * @param req
 * @param res
 */
let deleteMovieById: express.RequestHandler = (req: express.Request, res: express.Response): void => {
  Movie.findByIdAndRemove(req.params.id).exec().then((movie?: IMovieModel) => {
    res.send(movie);
  });
};

router.delete("/movie/:id", deleteMovieById);

router.post("/movie", (req: express.Request, res: express.Response): void => {
  let movie: IMovieModel = new Movie(req.body);

  movie.save(() => {
    res.send(movie);
  });
});

router.put("/movie", (req: express.Request, res: express.Response): void => {
  let query: Object = {
    _id: req.body._id
  };

  Movie.findOneAndUpdate(query, req.body).exec().then(() => {
    res.sendStatus(200);
  });
});

export default router;

