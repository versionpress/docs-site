/// <reference path='../../typings/tsd.d.ts' />

import * as React from 'react-dom';
import { Router} from 'react-router'
import * as routes from "./../shared/routes";
import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory();
React.render((<Router history={history} routes={routes}/>),document.getElementById('app'))