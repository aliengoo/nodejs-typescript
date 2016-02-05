"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserify from "browserify";
import tsify from "tsify";
import babelify from "babelify";
import watchify from "watchify";
import source from "vinyl-source-stream";

const lp = gulpLoadPlugins({
  lazy: true
});

const tsProject = lp.typescript.createProject({
  "module": "commonjs",
  "target": "es5",
  "noImplicitAny": true,
  "removeComments": false,
  "preserveConstEnums": true
});

// see default
let readyForServerStart = false;

const config = {
  html: {
    src: "client-src/html/index.html",
    dest: "public",
    watch: ["client-src/html/**"]
  },
  build: {
    js: {
      server: {
        src: ["server-src/**/*.ts", "server-src/**/*.tsx"],
        dest: "server",
        watch: ["server-src/**/*.ts", "server-src/**/*.tsx"],
        tsProject
      },
      client: {
        browserify: {
          // change this for production - sourcemaps will be produced when debug is enabled.
          debug: true,
          // extensions to process
          extensions: [".ts", ".tsx"],
          // path the the root tsx file
          entries: ["client-src/js/main.tsx"]
        },
        babelify: {
          extensions: [".ts", ".tsx"]
        },
        watch: ["client-src/**/*.ts", "client-src/**/*.tsx"],
        bundle: "bundle.js",
        dest: "public/js",
        tsify: {
          "target": "es6",
          "noImplicitAny": true,
          "removeComments": false,
          "preserveConstEnums": true,
          "sourceMap": true,
          "jsx": "react"
        }
      }
    },
    sass: {
      componentSrc: [
        "!client-src/stylesheets/main.scss",
        "client-src/js/**/*.scss"
      ],
      src: ["client-src/stylesheets/main.scss"],
      watch: ["client-src/stylesheets/**/*.scss", "client-src/**/*.scss"],
      dest: "public/css",
      autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false
      }
    }
  },
  lint: {
    src: ["server-src/**/*.ts", "client-src/**/*.ts"],
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
  },
  fonts: {
    src: ["node_modules/font-awesome/fonts/*"],
    dest: "public/fonts"
  }
};

gulp.task("fonts", () => {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dest));
});


gulp.task("build:sass", () => {
  let sass = lp.sass();

  let autoprefixer = lp.autoprefixer(config.build.sass.autoprefixer);

  let injectComponents = lp.inject(gulp.src(config.build.sass.componentSrc, {read: false}), {
    relative: true,
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    transform: filePath => `@import '${filePath}';`
  });

  return gulp.src(config.build.sass.src)
    .pipe(lp.plumber())
    .pipe(injectComponents)
    .pipe(sass)
    .pipe(autoprefixer)
    .pipe(lp.cssnano())
    .pipe(gulp.dest(config.build.sass.dest))
    .pipe(lp.livereload());
});

gulp.task("lint", () => {
  return gulp.src(config.lint.src)
    .pipe(lp.tslint())
    .pipe(lp.tslint.report(config.lint.reporter));
});

gulp.task("build:js:server", ["lint"], () => {

  var _config = config.build.js.server;

  return gulp.src(_config.src)
    .pipe(lp.sourcemaps.init())
    .pipe(lp.typescript(_config.tsProject))
    .pipe(lp.sourcemaps.write())
    .pipe(gulp.dest(_config.dest)).on('end', () => {
      if (readyForServerStart) {
        lp.developServer.restart();
      }
    });
});

gulp.task("build:js:client", ["lint"], () => {
  var _config = config.build.js.client;

  const b = browserify(_config.browserify);
  b.plugin(tsify, _config.tsify);
  b.transform(babelify.configure(_config.babelify));

  return watchify(b)
    .bundle()
    .on("error", error => {
      console.log(error);
    })
    .pipe(source(_config.bundle))
    .pipe(gulp.dest(_config.dest))
    .pipe(lp.livereload());
});

gulp.task("html", () => {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dest));
});


gulp.task("server:start", () => {
  lp.developServer.listen(config.server.start);
});

gulp.task("default", ["build:sass", "build:js:server", "build:js:client", "html"], () => {
  lp.livereload({
    start: true
  });

  readyForServerStart = true;
  lp.developServer.listen(config.server.start);

  gulp.watch(config.html.watch, ["html"]);
  gulp.watch(config.build.sass.watch, ["build:sass"]);
  gulp.watch(config.build.js.server.watch, ["build:js:server"]);
  gulp.watch(config.build.js.client.watch, ["build:js:client"]);
});

