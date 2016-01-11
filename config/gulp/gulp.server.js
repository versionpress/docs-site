'use strict';

let gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: ['gulp-*']
    }),
    environment = require('./lib/environment.js');

gulp.task('webpack-dev-server','Launches webpack-dev-server', function() {
    require("../webpack/webpack.dev.server.js");
});

gulp.task('serve', 'Launch the server on development mode, autoreloads it when there are code changes', ['build','webpack-dev-server'], function() {

    var nodemonConfiguration = {
        script: './dist/server.js',
        ext: 'jade ts', //reload when any of these file extensions changes
        ignore: [],
        env : {
            'NODE_ENV': 'development'
        }
    };

// Add port to configuration if specified, otherwise leave out so dotenv .env file can be potentially used
if (environment.get('port', false)) {
    nodemonConfiguration.env.PORT = environment.get('port');
}

$.nodemon(nodemonConfiguration)
    //.on('change', ['lint'])
    .on('restart', function () {
        console.log('restarted!')
    });

}, {
    options: {
        'port': 'The port # the server should listen to. Defaults to value specified in .env file under PORT, or 3000 if .env not present'
    }
});