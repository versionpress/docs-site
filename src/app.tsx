/// <reference path="../typings/tsd.d.ts" />
'use strict';

// Include dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var ReactDOM= require('react-dom/server');
var React= require('react');
var match = require('react-router').match;
var RoutingContext = require('react-router').RoutingContext;
var createLocation= require('history/lib/createLocation');

// Load environment variables= require(file if present
var dotenv= require('dotenv');
dotenv.load({
silent: true,
path: 'src/.env'
});

// Modular Route definitions
var routes = require('./shared/routes').default;

// Error handler service
var ErrorHandler =  require('./services/ErrorHandler');

// Main app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/public",express.static(path.join(__dirname, 'public'))); // Serve public files

app.use(function (req, res) {
    let location = createLocation(req.path);

    match({ routes, location }, function (error, redirectLocation, renderProps) {
        if (redirectLocation) {
            res.status(301).redirect(redirectLocation.pathname + redirectLocation.search);
    }else if (error) {
            res.status(500).send(error.message);
        }else if (renderProps == null) {
            res.status(404).send('Not found');
        }else {
            console.log(renderProps);
            let content = ReactDOM.renderToString(<RoutingContext {...renderProps} />)
            res.status(200).render('index', { content: content });
        }
    });
});

// Development error handler - will print stacktrace
// Production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
    app.use(ErrorHandler.development);
} else {
    app.use(ErrorHandler.production);
}
// Server part
const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + port);
}).on('error', err => {
    console.log('Cannot start server, port most likely in use');
    console.log(err);
});

