/// <reference path="../typings/tsd.d.ts" />
'use strict';
// Include dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Modular Route definitions
var exampleRoute = require('./routes/example');
// Error handler service
var ErrorHandler_1 = require('./services/ErrorHandler');
// Main app
var app = express();
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/icon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// On off
app.use(express.static(path.join(__dirname, 'public'))); // Serve public files
// Register routes (as middleware layer through express.Router())
app.use(exampleRoute);
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});
// Error handlers
// Development error handler - will print stacktrace
// Production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(ErrorHandler_1.development);
}
else {
    app.use(ErrorHandler_1.production);
}
exports["default"] = app;
