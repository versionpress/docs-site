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
    if(rs.shouldBeRedirected(request.path.substring(1))){
      let redirectPath = cfg.getRedirects()[request.path.substring(1)];
      console.log("Redirecting " + request.path.substring(1) + " -> " + redirectPath);
      response.redirect(301, "/" + redirectPath);
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
