import { Request, Response } from 'express';
import { Page } from '../models/Page';
import { Route } from '../models/Route';
import { Language } from '../models/Language';
import { ConfigService } from '../services/ConfigService';
import { RoutingService } from '../services/RoutingService';
import { renderDocument } from '../services/RenderService';

module PageController {

  'use strict';

  var cfg: ConfigService = ConfigService.getInstance();
  var rs: RoutingService = RoutingService.getInstance();


  export function renderPage(req: Request, res: Response) {
    var language: string = req.path.split('/')[1];
    return _renderPage(req, res, language);
  }

  function _renderPage(req: Request, res: Response, language: string) {

    var route: Route = rs.getRouteByUrl(req.path);
    if (typeof route !== 'undefined') {
      let page = new Page(cfg.getDisplayVersion(), rs.getRoutesForLngAndVersion(language));
      page.nextRoute = rs.getNext(route.url, language);
      page.previousRoute = rs.getPrevious(route.url, language);
      page.language = Language[language];
      page.title = route.title;
      if (route.isValidForCurrentVersion(cfg.getSemverDisplayVersion())) {
        page.nextRoute = rs.getNext(route.url, language);
        page.previousRoute = rs.getPrevious(route.url, language);
        renderDocument(route, page, res, _renderIndex);
      } else {
        res.status(200).render('future-topic', page);
      }
    } else {

      let page = new Page(cfg.getDisplayVersion(), rs.getRoutesForLanguage(language));
      page.language = Language[language];
      page.title = 'Page Not Found';
      page.url = req.protocol + '://' + cfg.siteRoot + req.path;
      res.status(404).render('404', page);
    }

  }

  function _renderIndex(res: Response, page: Page) {
    res.status(200).render('index', page);
  }
}

export = PageController;
