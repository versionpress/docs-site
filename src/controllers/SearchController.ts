/// <reference path="../models/Page.ts" />

import { Request, Response } from 'express';
import {Language} from '../models/Language';
import {ConfigService} from '../services/ConfigService';
import {RoutingService} from '../services/RoutingService';

module SearchController {

  'use strict';

  var cfg:ConfigService = ConfigService.getInstance();
  var rs:RoutingService = RoutingService.getInstance();


  export function renderSearchResults(req:Request, res:Response) {
    let page = {
      title: 'Search results',
      language: Language[req.query.language],
      displayVersion: cfg.getDisplayVersion(),
      externalContent: true,
      rootRoute: rs.getRoutesForLngAndVersion(req.query.language)
    };

    res.status(200).render('search',page);
  }

}

export = SearchController;
