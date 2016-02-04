///<reference path="../../typings/tsd.d.ts"/>

"use strict";

// noinspection TsLint
import * as React from "react";
import {Router, Route} from "react-router";

import HomeView from "./views/home/HomeView";
import MovieView from "./views/movie/MovieView";

let router: JSX.Element = (
  <Router>
    <Route path="/" component={HomeView}/>
    <Route path="/movie/new" component={MovieView}/>
  </Router>
);

export default router;
