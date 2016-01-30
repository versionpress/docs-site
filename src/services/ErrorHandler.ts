/// <reference path="../../typings/typings.d.ts" />
import { Request, Response } from 'express';
import {DocsArticle} from '../models/DocsArticle';
import {ConfigServiceClass} from '../services/ConfigServiceClass';
import {RoutingServiceClass} from '../services/RoutingServiceClass';
import {Language} from '../models/Language';
import {Page} from '../models/Page';

// Error handler service

module ErrorHandler {

    'use strict';

    /**
     * Generates a 500 response
     */
    let handler = (err: Error, req: Request, res: Response, next: Function, includeStackTrace: boolean) => {
        var cfg : ConfigServiceClass = ConfigServiceClass.getInstance();
        var rs : RoutingServiceClass = RoutingServiceClass.getInstance();
        var language: string = req.path.split("/")[1];
        res.status(res.statusCode || 500);
        if(res.statusCode==400) {
            var docsArticle = new DocsArticle();
            let page = new Page(docsArticle, cfg.appConfig.displayVersion, rs.getRoutesForLanguage(language));
            page.language = Language[language];
            page.url = req.protocol+"://"+cfg.siteRoot+req.path;
            docsArticle.title="Page Not Found";
            res.render('404', page);

        } else {
            res.render('error', {
                message: err.message,
                error: includeStackTrace ? err : {},
                docsArticle: {
                    title: 'Error'
                }
            });
        }
    };

    /**
     * 500 error development response
     */
    export function development (err: Error, req: Request, res: Response, next: Function) {
        return handler(err, req, res, next, true);
    };

    /**
     * 500 error production response
     */
    export function production (err: Error, req: Request, res: Response, next: Function) {
        return handler(err, req, res, next, false);
    };

}

export = ErrorHandler;
