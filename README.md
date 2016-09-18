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

Production deployment: https://docs.versionpress.net/en

The docs-site is now running on our Kubernetes cluster and I still owe a deployment documentation here (TODO @stibi)

## Docker

https://hub.docker.com/r/versionpress/docs-site/

You can use the `docker-compose.yml` to run the docs-site locally in a Docker container, or run `make run` (on Linux,
MacOS) for the same thing, a Docker container will start.

In both cases, make sure that you have exported a variable with path to the `versionpress/docs` content, example:

```
$ export DOCS_REPO_PATH=/home/stibi/dev/projects/versionpress/docs
$ docker-compose up
Starting docssite_docs-site_1
Attaching to docssite_docs-site_1
docs-site_1  | ConfigService initialized
docs-site_1  | RoutingService initialized
docs-site_1  | skipping not Markdown file - /opt/docs/content/en/03-sync/config.yml
docs-site_1  | GET / 301 4.581 ms - 37
```

Now you can access the docs-site at `http://127.0.0.1:3000`
