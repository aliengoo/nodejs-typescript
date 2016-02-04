"use strict";
import * as mongoose from "mongoose";
import {Promise} from "mongoose";
import {IMovieModel} from "./IMovieModel";
import {IMovie} from "./IMovie";

const SCHEMA_OPTIONS: mongoose.SchemaOption = {
  collection: "movies"
};

const SCHEMA: Object = {
  director: {
    type: String
  },
  title: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: Number
  }
};

const MOVIE_SCHEMA: mongoose.Schema = new mongoose.Schema(SCHEMA, SCHEMA_OPTIONS);

MOVIE_SCHEMA.static("findByTitle", function (title: String): Promise<IMovie> {
  return this.findOne({
    title
  }).exec();
});

let movieModel: IMovieModel = <IMovieModel>mongoose.model("Movie", MOVIE_SCHEMA);

export default movieModel;
