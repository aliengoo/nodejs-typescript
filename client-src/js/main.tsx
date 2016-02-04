///<reference path="../../typings/tsd.d.ts"/>
"use strict";

declare var global: any;

// noinspection TsLint
let $ = require("jquery");

global.$ = $;
global.jQuery = global.$;

// noinspection TsLint
global.Foundation = require("foundation-sites");

// noinspection TsLint
import * as React from "react";

import * as ReactDOM from "react-dom";

// noinspection TsLint
import router from "./router";

ReactDOM.render(router, document.getElementById("react-container"));

