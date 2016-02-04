"use strict";

import * as express from "express";
import MovieModel  from "../db/models/MovieModel";
import {Query} from "mongoose";
import {IMovie} from "../db/models/IMovie";

let router: express.Router = express.Router();

/**
 * Gets the movie base on the ID
 * @param req
 * @param res
 */
let getMovieById: express.RequestHandler = (req: express.Request, res: express.Response): void => {
  let query: Query<IMovie> = MovieModel.findById(req.params.id);

  query.exec().then((movie?: IMovie) => {
    if (movie) {
      res.send(movie);
    } else {
      res.sendStatus(404);
    }
  });
};

router.get("/movie/:id", getMovieById);
router.get("/movie", (req: express.Request, res: express.Response): void => {
  MovieModel.findByTitle(req.query.title).then((movie?: IMovie) => {
    if (movie) {
      res.send(movie);
    } else {
      res.sendStatus(404);
    }
  });
});

/**
 * Deletes a movie
 * @param req
 * @param res
 */
let deleteMovieById: express.RequestHandler = (req: express.Request, res: express.Response): void => {
  MovieModel.findByIdAndRemove(req.params.id).exec().then((movie?: IMovie) => {
    res.send(movie);
  });
};

router.delete("/movie/:id", deleteMovieById);

router.post("/movie", (req: express.Request, res: express.Response): void => {
  let movie: IMovie = new MovieModel(req.body);

  movie.save(() => {
    res.send(movie);
  });
});

router.put("/movie", (req: express.Request, res: express.Response): void => {
  let query: Object = {
    _id: req.body._id
  };

  MovieModel.findOneAndUpdate(query, req.body).exec().then(() => {
    res.sendStatus(200);
  });
});

export default router;

