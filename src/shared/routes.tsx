/// <reference path='../../typings/tsd.d.ts' />

/* tslint:disable:no-unused-variable */

import * as React from 'react';
import {Route, Router} from 'react-router';

import IndexController from "../controllers/IndexController";
import TextController from "../controllers/TextController";

export default (
  <Router>
   <Route path="/" component={IndexController}/>
   <Route path="/text" component={TextController}/>
 </Router>

);