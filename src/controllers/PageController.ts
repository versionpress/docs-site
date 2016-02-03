/// <reference path="../../typings/typings.d.ts" />
/// <reference path="../models/DocsArticle.ts" />
/// <reference path="../models/Page.ts" />

import { Request, Response } from 'express';
import {DocsArticle} from '../models/DocsArticle';
import {Page} from '../models/Page';
import {Route} from '../models/Route';
import {Language} from '../models/Language';
import {ConfigService} from '../services/ConfigService';
import {RoutingService} from '../services/RoutingService';
import {renderDocumentAsync} from '../services/RenderService';

module PageController {

  'use strict';

  /*
   * Return an empty 200 response
   */
  export function renderPage(req:Request, res:Response) {
    var language:string = req.path.split("/")[1];
    return _renderPage(req, res, language);
  }

  function _renderPage(req:Request, res:Response, language:string) {
    var cfg:ConfigService = ConfigService.getInstance();
    var rs:RoutingService = RoutingService.getInstance();
    let docsArticle = new DocsArticle();
    docsArticle.title = req.params.article;
    var route:Route = rs.getRouteByUrl(req.path);
    if (typeof route !== "undefined") {
      docsArticle.title = route.title;
      let page = new Page(docsArticle, cfg.appConfig.displayVersion, rs.getRoutesForLanguage(language));
      page.nextRoute = rs.getNext(route.url, language);
      page.previousRoute = rs.getPrevious(route.url, language);
      page.language = Language[language];
      renderDocumentAsync(route.path,page, res, _renderIndex);
    } else {
      docsArticle.title = "Page Not Found";
      let page = new Page(docsArticle, cfg.appConfig.displayVersion, rs.getRoutesForLanguage(language));
      page.language = Language[language];
      page.url = req.protocol + "://" + cfg.siteRoot + req.path;
      res.status(404).render('404', page);
    }

  }
  function _renderIndex(res:Response, page:Page) {
    res.status(200).render('index', page);
  }
}


export = PageController;
