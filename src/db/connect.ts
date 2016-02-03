"use strict";

import * as Q from "q";
import * as mongoose from "mongoose";
import configuration from "../config/configuration";

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Q.Promise;

mongoose.connect(configuration.databaseUrl);
