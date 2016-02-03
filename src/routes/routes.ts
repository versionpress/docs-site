'use strict';

import { Router } from 'express';
import { renderPage } from '../controllers/PageController';
import { renderSitemap } from '../controllers/SitemapController';

import { RoutingService} from '../services/RoutingService';

let router = Router();

var service = RoutingService.getInstance();

for (var language of service.languages) {
  router.get('/' + language + '/*', renderPage);
  router.get('/' + language, renderPage);
}

router.get('/sitemap.xml', renderSitemap);

router.get('/', function (request, response) {
  response.redirect(301, '/' + service.languages[0]);
});

export = router;
