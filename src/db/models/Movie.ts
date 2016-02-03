"use strict";
import * as mongoose from "mongoose";

export interface IMovieModel extends mongoose.Document {
}

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
MOVIE_SCHEMA.static("test", () => {
  return this.findOne({});
});

export default mongoose.model<IMovieModel>("Movie", MOVIE_SCHEMA);
