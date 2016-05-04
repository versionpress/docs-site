import { Request, Response } from 'express';
import {ConfigService} from '../services/ConfigService';
import {RoutingService} from '../services/RoutingService';
import {Language} from '../models/Language';
import {Page} from '../models/Page';

// Error handler service

module ErrorHandler {

  'use strict';

  /**
   * Generates a 500 response
   */
  let handler = (err: Error, req: Request, res: Response, next: Function, includeStackTrace: boolean) => {
    var cfg: ConfigService = ConfigService.getInstance();
    var rs: RoutingService = RoutingService.getInstance();
    var language: string = Language[req.path.split('/')[1]];
    if (typeof language === 'undefined') {
      language = rs.languages[0];
    }
    var page = new Page(cfg.getDisplayVersion(), rs.getRoutesForLanguage(language));
    page.language = Language[language];

    res.status(res.statusCode || 500);
    if (res.statusCode === 404) {
      page.url = req.protocol + '://' + cfg.siteRoot + req.path;
      page.title = 'Page Not Found';
      res.render('404', page);

    } else {
      page.title = 'Error';
      page.error = includeStackTrace ? err : {};
      page.errorMessage = err.message;
      res.render('error', page);
    }
  };

  /**
   * 500 error development response
   */
  export function development(err: Error, req: Request, res: Response, next: Function) {
    return handler(err, req, res, next, true);
  };

  /**
   * 500 error production response
   */
  export function production(err: Error, req: Request, res: Response, next: Function) {
    return handler(err, req, res, next, false);
  };

}

export = ErrorHandler;
