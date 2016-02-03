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
      delay: 600,
      env: {
        PORT: 3000,
        NODE_ENV: "development"
      }
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
    .pipe(lp.typescript(config.build.tsProject))
    .pipe(gulp.dest(config.build.dest)).on('end', () => {
      lp.developServer.restart();
    });
});

gulp.task("server:start", () => {
  lp.developServer.listen(config.server.start);
});

gulp.task("default", ["build", "server:start"], () => {
  gulp.watch(config.build.src, ["build"]);
  //gulp.watch(config.server.restart.watch, lp.developServer.restart);
});

