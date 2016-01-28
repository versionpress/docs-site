/// <reference path="../../typings/typings.d.ts" />

import { Request, Response } from 'express';
import {RoutingServiceClass} from '../services/RoutingServiceClass';
import {ConfigServiceClass} from '../services/ConfigServiceClass';

module SitemapController {

    'use strict';

    /*
     * Return an sitemap.xml
     */
    export function renderSitemap (req: Request, res: Response) {
        var cfg : ConfigServiceClass = ConfigServiceClass.getInstance();
        var rs : RoutingServiceClass = RoutingServiceClass.getInstance();
        res.set('Content-Type', 'text/xml');
        res.status(200).render('sitemap', {'routes':rs.flatRoutes,'siteRoot':cfg.siteRoot});

    }
}

export = SitemapController;
