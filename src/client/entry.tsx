/// <reference path='../../typings/tsd.d.ts' />

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router} from 'react-router'
import * as routes from "./../shared/routes";
import  {createHistory} from 'history';



ReactDom.render(<Router history={createHistory()} routes={routes.default}/>,document.getElementById('app'))