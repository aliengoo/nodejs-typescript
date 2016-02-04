"use strict";

import * as mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
  _id: String;
  title: String;
  director: String;
  year: Number;
}
