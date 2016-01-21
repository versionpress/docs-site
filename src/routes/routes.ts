'use strict';

// Test routes
import { Router } from 'express';
import { printMessage } from '../controllers/example';
import { RoutingServiceClass } from '../services/RoutingServiceClass';


let router = Router();

// Simple argument passing
var service = RoutingServiceClass.getInstance();
for(var language of service.languages) {
    router.get('/'+language+'/*', printMessage);
}

export = router;
