#VersionPress Docs Site #

This project handles serving of the [user documentation](https://github.com/versionpress/docs). It is deployed as [docs.versionpress.net](http://docs.versionpress.net/).



## Setup

1. Install [Node.js](https://nodejs.org).
    - The project was built using version [v4.2.6 LTS](https://nodejs.org/en/blog/release/v4.2.6/) but should generally run on any Node version.
2. Install Gulp globally - `npm install -g gulp-cli`
2. Run `npm install`
3. In the `./src` folder, create `.env` file from `.env.example` and update the variables as necessary
    - Specifically, set the `DOCS_SOURCE_ROOT` to point to the `content` folder of a local clone of the [docs repo](https://github.com/versionpress/docs).

You can now run `gulp help` to see the available commands, e.g., `build` or `watchEndServe` (see below).

## Building and running

### Development mode

The application is using webpack and gulp as build and task running tool. The most convinient way to start development on this project is to run

    $ gulp watchAndServe

Application is built and Node.js server started. Resources are processed via webpack and provided to client using webpack-dev-server. Application is accessible at http://localhost:3000/.

If you do not want to use hot module replacement where resources are provided via `webpack-dev-server` running on port `8888`, set variable `WEBPACK` in your `.env` file to `0`. After that, scripts and styles are loaded in a standard way.

#### Linting

Linting is currently removed from the build process but you can use it manually by typing `gulp tslint` into the console. Linting is performed according to the description file `tslint.json`.

### Production mode

Before deploying to the server, run the command

    $ gulp build

which builds the application and puts all of its files into the `dist` folder.

When run on a Node.js server, use `dist` as a working dir and `server.js` as a startup script. URL of the deployed application is the same as in development mode, i.e., <http://localhost:3000/>. The port can be adjusted by setting the `PORT` variable in the `.env` file.

**Note**

In production, Node.js server should not be exposed directly to the internet. Some kind of http server (e.g., [Nginx](http://nginx.org/)) should be placed in front of it.


## Development environment tips

- Please use an IDE / editor that supports `.editorconfig`.
- Use linting - run `gulp tslint` manually (it's not part of the build process)

