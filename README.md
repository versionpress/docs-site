# VersionPress Docs Site

This project handles serving of the [user documentation](https://github.com/versionpress/docs). It is deployed to [docs.versionpress.net](http://docs.versionpress.net/).


## Running locally

1. Install [Node.js](https://nodejs.org) 4.2.6 LTS or newer.
5. Run `npm install`.
3. In the `src` folder, create `.env` from `.env.example` and update the values as necessary.
    - Specifically, check that `DOCS_SOURCE_ROOT` points to the `content` folder of a cloned [docs repo](https://github.com/versionpress/docs).
4. Run `npm run watch`. This will build the project, watch the source files (both JS and Markdown) and open the browser for you.

By default, the browser will open at **<http://localhost:3001>** (3000 is the Node.js port, Browsersync runs its own tiny webserver at a port incremented by 1).


## Editing Markdown files

Markdown files in the `docs` repo that you specified using the `DOCS_SOURCE_ROOT` environment variable are automatically watched. Just edit them and see the site re-rendered in the browser automatically.


## Developing the docs site

### Server-side (Node.js) code

While the `watch` task is running, simply edit any TypeScript, Jade or similar file and the Node server will be reloaded and browsers refreshed via Browsersync.

The project can be built manually using `npm run build`.

### Client-side code (JS, LESS, ...) 

While the `watch` task is running, you can edit any client-side file, e.g., LESS file, client-side JS / TS etc. It will be automatically compiled for you and browsers will be refreshed via Browsersync.

Note: this doesn't use webpack dev server yet so it is quite slow, somewhere around 3-5 seconds. We'll add webpack dev server in the future if we find the workflow too painful.


## Gulp tasks

Build is automated via Gulp. Common actions have `npm run xyz` aliases so you don't even need to have Gulp CLI installed globally but if you do, `gulp xyz` will work equally well.

Run `gulp help` to see the available tasks or inspect `package.json` to see the predefined `npm run` aliases.


## Deployment

AWS Elastic Beanstalk runs the app. TODO: document the deployment.

