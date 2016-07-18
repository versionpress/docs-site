FROM mhart/alpine-node:6.2.1

MAINTAINER VersionPress / Martin Stiborský "info@versionpress.net"

RUN mkdir -p /opt/docs-site
ADD . /opt/docs-site/
WORKDIR /opt/docs-site

RUN cp src/.env.example src/.env
RUN sed -i 's/^\(DOCS_SOURCE_FOLDER=\).*/\1\/opt\/docs\/content/' src/.env
RUN sed -i 's/^\(WEBPACK=\).*/\10/' src/.env

RUN npm install
RUN npm install --global gulp-cli
RUN ./node_modules/.bin/typings install && \
./node_modules/.bin/typings prune && \
npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
