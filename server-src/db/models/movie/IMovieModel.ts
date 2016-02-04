"use strict";

import * as mongoose from "mongoose";
import {Promise} from "mongoose";
import {IMovie} from "./IMovie";

export interface IMovieModel extends mongoose.Model<IMovie> {
  findByTitle: (title: String) => Promise<IMovie>;
}
