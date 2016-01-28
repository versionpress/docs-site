'use strict';

// Test routes
import { Router } from 'express';
import { renderPage } from '../controllers/PageController';
import { RoutingServiceClass } from '../services/RoutingServiceClass';


let router = Router();

// Simple argument passing
var service = RoutingServiceClass.getInstance();
for(var language of service.languages) {
    router.get('/'+language+'/*', renderPage);
    router.get('/'+language, renderPage);
}


export = router;
