'use strict';

// Test routes
import { Router } from 'express';
import { printMessage } from '../controllers/example';

let router = Router();

// Simple argument passing
router.get('/:message', printMessage);

export = router;
