"use strict";

import * as mongoose from "mongoose";
import configuration from "../config/configuration";

mongoose.connect(configuration.databaseUrl);
