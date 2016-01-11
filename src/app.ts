/// <reference path="../typings/tsd.d.ts" />

'use strict';

// Include dependencies
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

// Modular Route definitions
import * as exampleRoute from './routes/example';

// Error handler service
import { development as DevelopmentErrorHandler, production as ProductionErrorHandler } from './services/ErrorHandler';

// Main app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// On off
app.use(express.static(path.join(__dirname, 'public'))); // Serve public files

// Register routes (as middleware layer through express.Router())
app.use(exampleRoute);

// Catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
    let err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});

// Error handlers

// Development error handler - will print stacktrace
// Production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(DevelopmentErrorHandler);
} else {
    app.use(ProductionErrorHandler);
}

export default app;
