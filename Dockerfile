FROM mhart/alpine-node:8

MAINTAINER VersionPress / Martin Stiborský "info@versionpress.net"

RUN mkdir -p /opt/docs-site
ADD . /opt/docs-site/
WORKDIR /opt/docs-site

ENV DOCS_SOURCE_FOLDER /opt/docs
ENV AVAILABLE_LANGUAGES en
ENV WEBSITE_ROOT docs.versionpress.net
ENV PORT 3000

RUN npm install gulp-cli -g
RUN yarn
RUN ./node_modules/.bin/typings install && \
./node_modules/.bin/typings prune && \
npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
