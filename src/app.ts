/// <reference path="../typings/typings.d.ts" />
'use strict';

// Include dependencies
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';
import {ConfigService} from './services/ConfigService';

// Modular Route definitions
import * as routes from './routes/routes';

// Error handler service
import { development as DevelopmentErrorHandler, production as ProductionErrorHandler } from './services/ErrorHandler';

// Main app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// add moment.
app.locals.moment = moment;

app.locals.dynamicScripts = process.env.WEBPACK;

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/public/img', express.static(__dirname + '/public/img')); // Serve public files
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/css/app.css', express.static(__dirname + '/public/app.css'));

app.use('/media', express.static(ConfigService.getInstance().docsDir + '/media'));

// Register routes (as middleware layer through express.Router())
app.use(routes);

// Catch 404 and forward to error handler
app.use((req:express.Request, res:express.Response, next:Function) => {
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
  app.locals.pretty = true;
} else {
  app.use(ProductionErrorHandler);
}

export default app;
