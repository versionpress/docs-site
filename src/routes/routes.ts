import { Router } from 'express';
import { renderPage } from '../controllers/PageController';
import { renderSearchResults } from '../controllers/SearchController';
import { renderSitemap } from '../controllers/SitemapController';

import { RoutingService} from '../services/RoutingService';

let router = Router();

var rs = RoutingService.getInstance();

for (var language of rs.languages) {
  router.get('/' + language + '/*', function (request, response) {
    if(rs.shouldBeRedirected(request.path.substring(1))){
      let redirectPath = rs.getRedirectPath(request.path.substring(1));
      console.log("Redirecting " + request.path.substring(1) + " -> " + redirectPath);
      response.redirect(301, "/" + redirectPath);
    } else {
      renderPage(request, response);
    }
  });
  router.get('/' + language, renderPage);
}
router.get('/search', renderSearchResults);
router.get('/sitemap.xml', renderSitemap);

router.get('/', function (request, response) {
  response.redirect(301, '/' + rs.languages[0]);
});

export = router;
