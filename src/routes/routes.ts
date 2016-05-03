import { Router } from 'express';
import { renderPage } from '../controllers/PageController';
import { renderSitemap } from '../controllers/SitemapController';

import { RoutingService} from '../services/RoutingService';
import {ConfigService} from "../services/ConfigService";

let router = Router();

var rs = RoutingService.getInstance();
var cfg = ConfigService.getInstance();

for (var language of rs.languages) {
  router.get('/' + language + '/*', function (request, response) {
    if(rs.shouldBeRedirected(request.path)){
      console.log("Redirecting " + request.path + " -> " + cfg.getRedirectRules()[request.path]);
      response.redirect(301, cfg.getRedirectRules()[request.path]);
    } else {
      renderPage(request, response);
    }
  });
  router.get('/' + language, renderPage);
}

router.get('/sitemap.xml', renderSitemap);

router.get('/', function (request, response) {
  response.redirect(301, '/' + rs.languages[0]);
});

export = router;
