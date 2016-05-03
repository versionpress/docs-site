import { Request, Response } from 'express';
import {RoutingService} from '../services/RoutingService';
import {ConfigService} from '../services/ConfigService';

module SitemapController {

  'use strict';

  /*
   * Return an sitemap.xml
   */
  export function renderSitemap(req: Request, res: Response) {
    var cfg: ConfigService = ConfigService.getInstance();
    var rs: RoutingService = RoutingService.getInstance();
    res.set('Content-Type', 'text/xml');
    res.status(200).render('sitemap', {'routes': rs.flatRoutes, 'siteRoot': cfg.siteRoot});

  }
}

export = SitemapController;
