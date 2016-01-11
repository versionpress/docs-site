/// <reference path='../../typings/tsd.d.ts' />

/* tslint:disable:no-unused-variable */

import * as React from 'react';
import {Route, Router, IndexRoute} from 'react-router';

import IndexController from "../controllers/IndexController";
import TextController from "../controllers/TextController";
import * as routes from "./../shared/routes";
import  {createHistory} from 'history';


export default (
    <Router>
        <Route path="/" component={IndexController}/>
        <Route path="text/:message" component={TextController}/>
    </Router>
);