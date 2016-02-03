"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";

const lp = gulpLoadPlugins({
  lazy: true
});

const config = {
  build: {
    src: ["src/**/*.ts"],
    dest: "server",
    tsProject: lp.typescript.createProject('tsconfig.json')
  },
  lint: {
    src: ["src/**/*.ts"],
    /*
     "json" prints stringified JSON to console.log.
     "prose" prints short human-readable failures to console.log.
     "verbose" prints longer human-readable failures to console.log.
     "full" is like verbose, but displays full path to the file
     "msbuild" for Visual Studio
     */
    reporter: "prose"
  },
  server: {
    start: {
      path: "server/index.js",

      // adding a delay seems to allow time
      // for the debugger to detach, which prevents EADDRINUSE errors
      delay: 500,
      execArgv: ['--harmony', '--debug=5858'],
      env: {
        PORT: 3000,
        NODE_ENV: "development"
      },

      // default is SIGTERM, but that's not supported on windows
      killSignal: "SIGINT"
    },
    restart: {
      watch: ["server/**/*.js"]
    }
  }
};

gulp.task("lint", () => {
  return gulp.src(config.lint.src)
    .pipe(lp.tslint())
    .pipe(lp.tslint.report(config.lint.reporter));
});

gulp.task("build", ["lint"], () => {
  return gulp.src(config.build.src)
    .pipe(lp.sourcemaps.init())
    .pipe(lp.typescript(config.build.tsProject))
    .pipe(lp.sourcemaps.write())
    .pipe(gulp.dest(config.build.dest)).on('end', lp.developServer.restart);
});

gulp.task("server:start", () => {
  lp.developServer.listen(config.server.start);
});

gulp.task("default", ["build", "server:start"], () => {
  gulp.watch(config.build.src, ["build"]);
});

