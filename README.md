# Docs Site

The engine powering [docs.versionpress.net](http://docs.versionpress.net/en). The content itself is managed throught the [docs repo](https://github.com/versionpress/docs).


## Setup

1. Install [Node.js](https://nodejs.org)
2. Install TSD: `npm install -g tsd`
3. Run `npm install`
4. Run `tsd install`
5. In the `src` folder, create `.env` file from `.env.example` and set path to documentation folder (probably a cloned [docs repo](https://github.com/versionpress/docs) somewhere on the local drive)


## Run

The application is using webpack and gulp as the build and task running tool. Run

    gulp watchAndServe

to build and start the Node.js server. Resources are processed via webpack and provided to client using webpack-dev server. Application is accessible at http://localhost:3000/.

When run standalone, use `/dist` as a working dir and `server.js` as a startup script. URL of the application is the same. Port can be adjusted by setting the `PORT` variable in the `.env` file.

**Note**

In production, Node.js server should not be exposed directly to the internet. Some kind of http server (e.g., Nginx) should be placed in front.

