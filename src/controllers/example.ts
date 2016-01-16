/// <reference path="../../typings/tsd.d.ts" />

import { Request, Response } from 'express';

/**
 * Example controller that provides a healthcheck endpoint
 */
module Example {

    'use strict';

    /*
     * Return an empty 200 response
     */
    export function printMessage (req: Request, res: Response) {
        res.status(200).render('index',{content: 'Hello ' + req.params.message, title: 'index', prevTopic:"aaa", nextTopic:"bbb"});
    }

}

export = Example;
