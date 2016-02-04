#VersionPress Docs Site #

This project handles serving of the [user documentation](https://github.com/versionpress/docs). It is deployed as [docs.versionpress.net](http://docs.versionpress.net/).

see [Wiki](https://github.com/versionpress/docs-site/wiki) and [Docs wiki](https://github.com/versionpress/docs/wiki) for usage manual and hints.

##DEVELOPMENT ENVIRONMENT

We prefer code that not only works, but also looks nice. You can extend/develop this project in any editor/IDE that is capable of cooperating with `.editorconfig` (see Download section of [EditorConfig](http://editorconfig.org/)).

## Setup

This version of `docs-site` is based on Node.js, so before starting several steps should be done.

- install [Node.js](https://nodejs.org). The project was built using version `v4.2.6 LTS` but it is also running on `v5.5.0 Stable`.
- perform `npm install`
- perform `npm install gulp-cli -g`
- perform `npm install tsd -g`
- in `./src` folder create `.env` file from `.env.example` and set path (`DOCS_SOURCE_ROOT` variable) to a documentation `content` folder (probably cloned somewhere on the local drive).

#Gulp tasks

If you type `gulp help` after the project setup, you should see available gulp tasks with description.

```
Available tasks
  build                   Builds the server app (compiles & copies)
  clean
  default                 Default task: run build [help]
  help                    Display this help text.
  serve                   Launch the server on development mode, autoreloads it when there are code changes [build, webpack-dev-server]
   --port                 The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present
  tslint                  Runs a typescript linter on the application code
  watch                   Master watch task, adds cumulative watches [tsWatcher, nonTsWatcher]
  watchAndServe           Launch the server on development mode, autoreloads it when there are code changes, plus registers cumulative watch task [watch, serve]
   --port                 The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present
  webpack                 Builds sources for client side
  webpack-dev-server      Launches webpack-dev-server
```

##Running application DEVELOPMENT mode

The application is using webpack and gulp as build and task running tool. The most convinient way to start development on this project is to type

`gulp watchAndServe`

into console/terminal. Application is build and Node.js server is starded. Resources are processed via webpack and provided to client using webpack-dev-server. Application is accessible on `http://localhost:3000/`.

If you do not want to use hot module replacement, where resources are provided via `webpack-dev-server` running on port `8888`, set variable `WEBPACK` in your `.env` file to `0`. After that, scripts and styles are loaded standard way.

###Linting
Linting is currently removed from build process, but you can use it manually by typing `gulp tslint` into console. Linting is performed according to the description file `tslint.json` 

##Running application PRODUCTION mode

Before deploying to the server, run command

`gulp build`

which builds application and places all of its files into `./dist` folder.

When run on Node.js server use `./dist` as working dir and `server.js` as startup script. Url of deployed the application is same as in development mode. Application server port can be adjusted by setting `PORT` variable in `.env` file.

**Note**

In production, Node.js server should not be exposed directly to the internet. Some kind of http server ( e.g. [Nginx](http://nginx.org/)) should be placed in front.


