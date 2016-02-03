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
import {renderDocument} from '../services/RenderService';

module PageController {

  'use strict';

  var cfg:ConfigService = ConfigService.getInstance();
  var rs:RoutingService = RoutingService.getInstance();

  /*
   * Return an empty 200 response
   */
  export function renderPage(req:Request, res:Response) {
    var language:string = req.path.split("/")[1];
    return _renderPage(req, res, language);
  }

  function _renderPage(req:Request, res:Response, language:string) {

    let docsArticle = new DocsArticle();
    docsArticle.title = req.params.article;
    var route:Route = rs.getRouteByUrl(req.path);
    if (typeof route !== "undefined") {
      docsArticle.title = route.title;
      let page = new Page(docsArticle, cfg.appConfig.displayVersion, rs.getRoutesForLanguage(language));
      page.nextRoute = rs.getNext(route.url, language);
      page.previousRoute = rs.getPrevious(route.url, language);
      page.language = Language[language];
      if(route.isValidForCurrentVersion(page.version)) {
        page.nextRoute = rs.getNext(route.url, language);
        page.previousRoute = rs.getPrevious(route.url, language);
        renderDocument(route.path,page, res, _renderIndex);
      } else {
        res.status(200).render('future-topic', page);
      }
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
