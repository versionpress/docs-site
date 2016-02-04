#Node.js version of VersionPress Docs Site #

## Setup

This version of docs-site is based on Node.js, so before starting several steps should be done.


- install [Node.js](https://nodejs.org)
- perform `npm i`
- perform `npm i gulp-cli -g`
- perform `npm i tsd -g`
- perform `tsd install`
- in `./src` folder create `.env` file from `.env.example` and set path (`DOCS_SOURCE_ROOT` variable) to documentation `content` folder (probably cloned somewhere on the local drive)


##Running application DEVELOPMENT mode

Application is using webpack and gulp as build and task running tool. If you use command

`gulp watchAndServe`

application is build and Node.js server is starded. Resources are processed via webpack and provided to client using webpack-dev server. Application is accessible on `http://localhost:3000/`.

If you do not want to use hot module replacement, where resources are provided via `webpack-dev-server` running on port `8888`, set variable `WEBPACK` in your `.env` file to `0`. After that, scripts and styles are loaded standard way.

##Running application PRODUCTION mode

Before deploying to server, run command

`gulp build`

which builds application and places all of its files into `./dist` folder.

When run on Node.js server use `./dist` as working dir and `server.js` as startup script. Url of the application is same. Port can be adjusted by setting `PORT` variable in `.env` file.

**Note**

In production, Node.js server should not be exposed directly to internet. Some kind of http server ( e.g. Nginx) should be placed in front.



Site serving the [user documentation](https://github.com/versionpress/docs). Deployed as [docs.versionpress.net](http://docs.versionpress.net/).

see [Wiki](https://github.com/versionpress/docs-site/wiki) for usage manual and hints.


