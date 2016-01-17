/// <reference path="../../typings/typings.d.ts" />
/// <reference path="../models/DocsArticle.ts" />
/// <reference path="../models/Page.ts" />

import { Request, Response } from 'express';
import {DocsArticle} from '../models/DocsArticle';
import {Page} from '../models/Page';
import {ConfigServiceClass} from '../services/ConfigServiceClass';

module Example {

    'use strict';

    /*
     * Return an empty 200 response
     */
    export function printMessage (req: Request, res: Response) {
        var cfg : ConfigServiceClass = ConfigServiceClass.getInstance();
        let docsArticle = new DocsArticle();
        docsArticle.title=req.params.message;
        let page = new Page(docsArticle,cfg.config.displayVersion);
        res.status(200).render('index', page);

    }

}

export = Example;
