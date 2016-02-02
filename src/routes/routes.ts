'use strict';

// Test routes
import { Router } from 'express';
import { renderPage } from '../controllers/PageController';
import { renderSitemap } from '../controllers/SitemapController';

import { RoutingServiceClass } from '../services/RoutingServiceClass';


let router = Router();

// Simple argument passing
var service = RoutingServiceClass.getInstance();

for (var language of service.languages) {
  router.get('/' + language + '/*', renderPage);
  router.get('/' + language, renderPage);
}

router.get('/sitemap.xml', renderSitemap);

router.get('/', function (request, response) {
  response.redirect(301, '/' + service.languages[0]);
});


export = router;
