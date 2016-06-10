FROM node:5.5

MAINTAINER VersionPress / Martin Stiborský "info@versionpress.net"

RUN mkdir /opt/docs-site
ADD . /opt/docs-site/
WORKDIR /opt/docs-site

RUN npm install
RUN npm install --global gulp-cli
RUN ./node_modules/.bin/typings install && ./node_modules/.bin/typings prune && npm run build

RUN cp src/.env.example src/.env
RUN sed -i 's/^\(DOCS_SOURCE_FOLDER=\).*/\1\/opt\/docs\/content/' src/.env
RUN sed -i 's/^\(WEBPACK=\).*/\10/' src/.env

EXPOSE 3000

CMD ["npm", "run", "watch"]
